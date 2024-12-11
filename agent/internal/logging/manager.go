package logging

import (
	"bufio"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/klauspost/compress/gzip"
	"go.uber.org/zap"
	"gopkg.in/natefinch/lumberjack.v2"
)

// LogLevel represents log severity level
type LogLevel string

const (
	LevelDebug LogLevel = "debug"
	LevelInfo  LogLevel = "info"
	LevelWarn  LogLevel = "warn"
	LevelError LogLevel = "error"
)

// LogPattern represents a log pattern to match
type LogPattern struct {
	Pattern     string
	Level       LogLevel
	Description string
}

// LogConfig represents log file configuration
type LogConfig struct {
	MaxSize    int  // megabytes
	MaxAge     int  // days
	MaxBackups int  // number of backups
	Compress   bool // compress old files
}

// LogEntry represents a parsed log entry
type LogEntry struct {
	Timestamp   time.Time
	Level       LogLevel
	Message     string
	Source      string
	Pattern     string
	Description string
}

// Manager manages log files and patterns
type Manager struct {
	logger   *zap.Logger
	mu       sync.RWMutex
	files    map[string]*logFile
	patterns []LogPattern
	config   LogConfig
}

// logFile represents a monitored log file
type logFile struct {
	path   string
	config LogConfig
	writer *lumberjack.Logger
	done   chan struct{}
}

// NewManager creates a new log manager
func NewManager(logger *zap.Logger) *Manager {
	return &Manager{
		logger: logger,
		files:  make(map[string]*logFile),
	}
}

// AddLogFile adds a log file to monitor
func (m *Manager) AddLogFile(path string, config LogConfig) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if _, exists := m.files[path]; exists {
		return fmt.Errorf("log file already monitored: %s", path)
	}

	// Create directory if it doesn't exist
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}

	// Configure log rotation
	writer := &lumberjack.Logger{
		Filename:   path,
		MaxSize:    config.MaxSize,
		MaxAge:     config.MaxAge,
		MaxBackups: config.MaxBackups,
		Compress:   config.Compress,
	}

	m.files[path] = &logFile{
		path:   path,
		config: config,
		writer: writer,
		done:   make(chan struct{}),
	}

	return nil
}

// RemoveLogFile removes a log file from monitoring
func (m *Manager) RemoveLogFile(path string) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	file, exists := m.files[path]
	if !exists {
		return fmt.Errorf("log file not monitored: %s", path)
	}

	close(file.done)
	delete(m.files, path)

	return nil
}

// AddPattern adds a log pattern to match
func (m *Manager) AddPattern(pattern LogPattern) {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.patterns = append(m.patterns, pattern)
}

// Start starts log monitoring
func (m *Manager) Start(ctx context.Context) error {
	m.mu.RLock()
	files := make([]*logFile, 0, len(m.files))
	for _, file := range m.files {
		files = append(files, file)
	}
	m.mu.RUnlock()

	// Monitor each file
	for _, file := range files {
		go m.monitorFile(ctx, file)
	}

	return nil
}

// monitorFile monitors a single log file
func (m *Manager) monitorFile(ctx context.Context, file *logFile) {
	f, err := os.Open(file.path)
	if err != nil {
		m.logger.Error("Failed to open log file",
			zap.String("path", file.path),
			zap.Error(err))
		return
	}
	defer f.Close()

	// Seek to end of file
	if _, err := f.Seek(0, 2); err != nil {
		m.logger.Error("Failed to seek log file",
			zap.String("path", file.path),
			zap.Error(err))
		return
	}

	reader := bufio.NewReader(f)

	for {
		select {
		case <-ctx.Done():
			return
		case <-file.done:
			return
		default:
			line, err := reader.ReadString('\n')
			if err != nil {
				time.Sleep(100 * time.Millisecond)
				continue
			}

			// Parse and match patterns
			entry := m.parseLine(line, file.path)
			if entry != nil {
				m.processEntry(entry)
			}
		}
	}
}

// parseLine parses a log line into a LogEntry
func (m *Manager) parseLine(line, source string) *LogEntry {
	m.mu.RLock()
	patterns := make([]LogPattern, len(m.patterns))
	copy(patterns, m.patterns)
	m.mu.RUnlock()

	for _, pattern := range patterns {
		if matched, _ := regexp.MatchString(pattern.Pattern, line); matched {
			return &LogEntry{
				Timestamp:   time.Now(),
				Level:       pattern.Level,
				Message:     line,
				Source:      source,
				Pattern:     pattern.Pattern,
				Description: pattern.Description,
			}
		}
	}

	return nil
}

// processEntry processes a matched log entry
func (m *Manager) processEntry(entry *LogEntry) {
	// Log the entry
	m.logger.Info("Log pattern matched",
		zap.String("source", entry.Source),
		zap.String("pattern", entry.Pattern),
		zap.String("level", string(entry.Level)),
		zap.String("description", entry.Description),
		zap.String("message", entry.Message))
}

// GetEntries returns log entries matching filters
func (m *Manager) GetEntries(filters map[string]interface{}) []LogEntry {
	// Implementation of log entry filtering
	// This is a placeholder for actual implementation
	return nil
}

// Write implements io.Writer for direct logging
func (m *Manager) Write(p []byte) (n int, err error) {
	m.mu.RLock()
	files := make([]*logFile, 0, len(m.files))
	for _, file := range m.files {
		files = append(files, file)
	}
	m.mu.RUnlock()

	for _, file := range files {
		if _, err := file.writer.Write(p); err != nil {
			m.logger.Error("Failed to write to log file",
				zap.String("path", file.path),
				zap.Error(err))
		}
	}

	return len(p), nil
}

// Close closes all log files
func (m *Manager) Close() error {
	m.mu.Lock()
	defer m.mu.Unlock()

	for _, file := range m.files {
		close(file.done)
		if err := file.writer.Close(); err != nil {
			m.logger.Error("Failed to close log file",
				zap.String("path", file.path),
				zap.Error(err))
		}
	}

	return nil
}

// RotateLogs rotates log files based on size and age
func (m *Manager) RotateLogs(ctx context.Context) error {
	m.logger.Info("Starting log rotation")

	// Get list of log files
	files, err := m.getLogFiles()
	if err != nil {
		return fmt.Errorf("failed to get log files: %w", err)
	}

	for _, file := range files {
		// Check if rotation is needed
		needsRotation, err := m.needsRotation(file)
		if err != nil {
			m.logger.Error("Failed to check rotation status",
				zap.String("file", file.Name()),
				zap.Error(err))
			continue
		}

		if !needsRotation {
			continue
		}

		// Rotate the log file
		if err := m.rotateFile(file); err != nil {
			m.logger.Error("Failed to rotate log file",
				zap.String("file", file.Name()),
				zap.Error(err))
			continue
		}

		m.logger.Info("Successfully rotated log file",
			zap.String("file", file.Name()))
	}

	// Clean up old rotated logs
	if err := m.cleanupOldLogs(); err != nil {
		m.logger.Error("Failed to clean up old logs", zap.Error(err))
	}

	return nil
}

// Private helper methods

func (m *Manager) getLogFiles() ([]os.FileInfo, error) {
	return ioutil.ReadDir(m.config.LogDir)
}

func (m *Manager) needsRotation(file os.FileInfo) (bool, error) {
	// Check file age
	age := time.Since(file.ModTime())
	if age > m.config.MaxAge {
		return true, nil
	}

	// Check file size
	if file.Size() > m.config.MaxSize {
		return true, nil
	}

	return false, nil
}

func (m *Manager) rotateFile(file os.FileInfo) error {
	oldPath := filepath.Join(m.config.LogDir, file.Name())
	newPath := filepath.Join(m.config.LogDir, fmt.Sprintf("%s.%s",
		file.Name(),
		time.Now().Format("2006-01-02-15-04-05")))

	// Rename current log file
	if err := os.Rename(oldPath, newPath); err != nil {
		return fmt.Errorf("failed to rename log file: %w", err)
	}

	// Create new empty log file
	if err := m.createEmptyLogFile(oldPath); err != nil {
		return fmt.Errorf("failed to create new log file: %w", err)
	}

	// Compress rotated log file
	if err := m.compressLogFile(newPath); err != nil {
		m.logger.Error("Failed to compress rotated log file",
			zap.String("file", newPath),
			zap.Error(err))
	}

	return nil
}

func (m *Manager) createEmptyLogFile(path string) error {
	file, err := os.OpenFile(path, os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	return file.Close()
}

func (m *Manager) compressLogFile(path string) error {
	// Open the log file
	input, err := os.Open(path)
	if err != nil {
		return err
	}
	defer input.Close()

	// Create compressed file
	output, err := os.Create(path + ".gz")
	if err != nil {
		return err
	}
	defer output.Close()

	// Create gzip writer
	gw := gzip.NewWriter(output)
	defer gw.Close()

	// Copy content
	if _, err := io.Copy(gw, input); err != nil {
		return err
	}

	// Remove original file after compression
	return os.Remove(path)
}

func (m *Manager) cleanupOldLogs() error {
	files, err := m.getLogFiles()
	if err != nil {
		return err
	}

	for _, file := range files {
		// Skip if not a rotated log file
		if !strings.HasSuffix(file.Name(), ".gz") {
			continue
		}

		age := time.Since(file.ModTime())
		if age > m.config.RetentionPeriod {
			path := filepath.Join(m.config.LogDir, file.Name())
			if err := os.Remove(path); err != nil {
				m.logger.Error("Failed to remove old log file",
					zap.String("file", file.Name()),
					zap.Error(err))
				continue
			}
			m.logger.Info("Removed old log file",
				zap.String("file", file.Name()))
		}
	}

	return nil
}
