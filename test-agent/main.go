package main

import (
	"flag"
	"fmt"
	"log"
	"net/url"
	"os"
	"os/signal"
	"runtime"
	"time"

	"github.com/gorilla/websocket"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
)

type SystemMetrics struct {
	Hostname    string    `json:"hostname"`
	IPAddress   string    `json:"ipAddress"`
	CPUUsage    float64   `json:"cpuUsage"`
	MemoryUsage float64   `json:"memoryUsage"`
	OSInfo      OSInfo    `json:"osInfo"`
	Timestamp   time.Time `json:"timestamp"`
}

type OSInfo struct {
	Platform string `json:"platform"`
	OS       string `json:"os"`
	Arch     string `json:"arch"`
}

func main() {
	host := flag.String("host", "localhost", "DSH server host")
	port := flag.Int("port", 3001, "DSH server port")
	flag.Parse()

	serverAddr := fmt.Sprintf("%s:%d", *host, *port)

	// Create WebSocket URL
	u := url.URL{Scheme: "ws", Host: serverAddr, Path: "/ws/agent"}
	log.Printf("Connecting to %s", u.String())

	// Connect to WebSocket server
	c, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	// Handle interrupt signal
	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	// Create ticker for sending metrics
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			metrics, err := collectMetrics()
			if err != nil {
				log.Printf("Error collecting metrics: %v", err)
				continue
			}

			err = c.WriteJSON(metrics)
			if err != nil {
				log.Println("write:", err)
				return
			}

		case <-interrupt:
			log.Println("Received interrupt signal, closing connection...")
			err := c.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
			if err != nil {
				log.Println("write close:", err)
				return
			}
			return
		}
	}
}

func collectMetrics() (*SystemMetrics, error) {
	hostname, err := os.Hostname()
	if err != nil {
		return nil, fmt.Errorf("error getting hostname: %v", err)
	}

	v, err := mem.VirtualMemory()
	if err != nil {
		return nil, fmt.Errorf("error getting memory info: %v", err)
	}

	cpuPercent, err := cpu.Percent(time.Second, false)
	if err != nil {
		return nil, fmt.Errorf("error getting CPU info: %v", err)
	}

	hostInfo, err := host.Info()
	if err != nil {
		return nil, fmt.Errorf("error getting host info: %v", err)
	}

	metrics := &SystemMetrics{
		Hostname:    hostname,
		IPAddress:   "127.0.0.1", // You might want to implement proper IP detection
		CPUUsage:    cpuPercent[0],
		MemoryUsage: v.UsedPercent,
		OSInfo: OSInfo{
			Platform: hostInfo.Platform,
			OS:       runtime.GOOS,
			Arch:     runtime.GOARCH,
		},
		Timestamp: time.Now(),
	}

	return metrics, nil
}
