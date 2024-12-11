package resolver

import (
	"context"
	"fmt"
	"regexp"
	"sync"
	"time"

	"go.uber.org/zap"
)

// Problem represents a detected problem
type Problem struct {
	ID          string
	Type        string
	Source      string
	Description string
	Severity    string
	Status      string
	DetectedAt  time.Time
	ResolvedAt  *time.Time
	Resolution  string
}

// Pattern represents a problem pattern
type Pattern struct {
	Pattern     string
	Action      string
	Description string
}

// Resolver handles problem detection and resolution
type Resolver struct {
	logger   *zap.Logger
	mu       sync.RWMutex
	patterns []Pattern
	problems map[string]*Problem
}

// NewResolver creates a new resolver
func NewResolver(logger *zap.Logger) *Resolver {
	return &Resolver{
		logger:   logger,
		patterns: make([]Pattern, 0),
		problems: make(map[string]*Problem),
	}
}

// AddPattern adds a problem pattern
func (r *Resolver) AddPattern(pattern, action string) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.patterns = append(r.patterns, Pattern{
		Pattern:     pattern,
		Action:      action,
		Description: fmt.Sprintf("Match pattern: %s", pattern),
	})
}

// DetectProblems analyzes system state and returns detected problems
func (r *Resolver) DetectProblems(ctx context.Context) ([]Problem, error) {
	var problems []Problem

	// Check system resources
	if err := r.checkSystemResources(ctx, &problems); err != nil {
		return nil, fmt.Errorf("failed to check system resources: %w", err)
	}

	// Check service health
	if err := r.checkServiceHealth(ctx, &problems); err != nil {
		return nil, fmt.Errorf("failed to check service health: %w", err)
	}

	// Check network connectivity
	if err := r.checkNetworkConnectivity(ctx, &problems); err != nil {
		return nil, fmt.Errorf("failed to check network connectivity: %w", err)
	}

	return problems, nil
}

// ResolveProblem attempts to resolve a specific problem
func (r *Resolver) ResolveProblem(ctx context.Context, problem Problem) error {
	r.logger.Info("Attempting to resolve problem",
		zap.String("type", problem.Type),
		zap.String("component", problem.Component),
		zap.Any("details", problem.Details),
	)

	switch problem.Type {
	case "resource_exhaustion":
		return r.resolveResourceExhaustion(ctx, problem)
	case "service_failure":
		return r.resolveServiceFailure(ctx, problem)
	case "network_issue":
		return r.resolveNetworkIssue(ctx, problem)
	default:
		return fmt.Errorf("unsupported problem type: %s", problem.Type)
	}
}

// AutoResolve attempts to automatically resolve detected problems
func (r *Resolver) AutoResolve(ctx context.Context) error {
	problems, err := r.DetectProblems(ctx)
	if err != nil {
		return fmt.Errorf("failed to detect problems: %w", err)
	}

	for _, problem := range problems {
		if err := r.ResolveProblem(ctx, problem); err != nil {
			r.logger.Error("Failed to resolve problem",
				zap.String("type", problem.Type),
				zap.String("component", problem.Component),
				zap.Error(err),
			)
			continue
		}
		r.logger.Info("Successfully resolved problem",
			zap.String("type", problem.Type),
			zap.String("component", problem.Component),
		)
	}

	return nil
}

// Private helper methods

func (r *Resolver) checkSystemResources(ctx context.Context, problems *[]Problem) error {
	// Check CPU usage
	cpuUsage, err := r.metrics.GetCPUUsage(ctx)
	if err != nil {
		return err
	}
	if cpuUsage > 90 {
		*problems = append(*problems, Problem{
			Type:      "resource_exhaustion",
			Component: "cpu",
			Details:   map[string]interface{}{"usage": cpuUsage},
		})
	}

	// Check memory usage
	memUsage, err := r.metrics.GetMemoryUsage(ctx)
	if err != nil {
		return err
	}
	if memUsage > 90 {
		*problems = append(*problems, Problem{
			Type:      "resource_exhaustion",
			Component: "memory",
			Details:   map[string]interface{}{"usage": memUsage},
		})
	}

	// Check disk usage
	diskUsage, err := r.metrics.GetDiskUsage(ctx)
	if err != nil {
		return err
	}
	if diskUsage > 90 {
		*problems = append(*problems, Problem{
			Type:      "resource_exhaustion",
			Component: "disk",
			Details:   map[string]interface{}{"usage": diskUsage},
		})
	}

	return nil
}

func (r *Resolver) checkServiceHealth(ctx context.Context, problems *[]Problem) error {
	services, err := r.discovery.GetServices(ctx)
	if err != nil {
		return err
	}

	for _, service := range services {
		health, err := r.health.CheckService(ctx, service.ID)
		if err != nil {
			*problems = append(*problems, Problem{
				Type:      "service_failure",
				Component: service.Name,
				Details:   map[string]interface{}{"error": err.Error()},
			})
			continue
		}
		if !health.Healthy {
			*problems = append(*problems, Problem{
				Type:      "service_failure",
				Component: service.Name,
				Details:   map[string]interface{}{"status": health.Status},
			})
		}
	}

	return nil
}

func (r *Resolver) checkNetworkConnectivity(ctx context.Context, problems *[]Problem) error {
	endpoints, err := r.discovery.GetEndpoints(ctx)
	if err != nil {
		return err
	}

	for _, endpoint := range endpoints {
		if err := r.network.CheckConnectivity(ctx, endpoint); err != nil {
			*problems = append(*problems, Problem{
				Type:      "network_issue",
				Component: endpoint.Name,
				Details:   map[string]interface{}{"error": err.Error()},
			})
		}
	}

	return nil
}

func (r *Resolver) resolveResourceExhaustion(ctx context.Context, problem Problem) error {
	switch problem.Component {
	case "cpu":
		return r.optimizer.OptimizeCPU(ctx)
	case "memory":
		return r.optimizer.OptimizeMemory(ctx)
	case "disk":
		return r.optimizer.OptimizeDisk(ctx)
	default:
		return fmt.Errorf("unsupported resource type: %s", problem.Component)
	}
}

func (r *Resolver) resolveServiceFailure(ctx context.Context, problem Problem) error {
	service := problem.Component
	if err := r.manager.RestartService(ctx, service); err != nil {
		return fmt.Errorf("failed to restart service %s: %w", service, err)
	}
	return nil
}

func (r *Resolver) resolveNetworkIssue(ctx context.Context, problem Problem) error {
	endpoint := problem.Component
	if err := r.network.RepairConnection(ctx, endpoint); err != nil {
		return fmt.Errorf("failed to repair connection to %s: %w", endpoint, err)
	}
	return nil
}

// GetProblems returns all detected problems
func (r *Resolver) GetProblems() []*Problem {
	r.mu.RLock()
	defer r.mu.RUnlock()

	problems := make([]*Problem, 0, len(r.problems))
	for _, problem := range r.problems {
		problems = append(problems, problem)
	}

	return problems
}

// GetProblem returns a specific problem
func (r *Resolver) GetProblem(id string) (*Problem, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	problem, exists := r.problems[id]
	return problem, exists
}

// ClearResolved removes resolved problems
func (r *Resolver) ClearResolved() {
	r.mu.Lock()
	defer r.mu.Unlock()

	for id, problem := range r.problems {
		if problem.Status == "resolved" {
			delete(r.problems, id)
		}
	}
}

// matchPattern checks if a string matches any pattern
func (r *Resolver) matchPattern(input string) (Pattern, bool) {
	r.mu.RLock()
	patterns := make([]Pattern, len(r.patterns))
	copy(patterns, r.patterns)
	r.mu.RUnlock()

	for _, pattern := range patterns {
		matched, err := regexp.MatchString(pattern.Pattern, input)
		if err != nil {
			r.logger.Error("Pattern matching failed",
				zap.String("pattern", pattern.Pattern),
				zap.Error(err))
			continue
		}
		if matched {
			return pattern, true
		}
	}

	return Pattern{}, false
}

// addProblem adds a new problem
func (r *Resolver) addProblem(problem *Problem) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.problems[problem.ID] = problem
}

// updateProblem updates an existing problem
func (r *Resolver) updateProblem(id string, status, resolution string) {
	r.mu.Lock()
	defer r.mu.Unlock()

	if problem, exists := r.problems[id]; exists {
		problem.Status = status
		problem.Resolution = resolution
		if status == "resolved" {
			now := time.Now()
			problem.ResolvedAt = &now
		}
	}
}
