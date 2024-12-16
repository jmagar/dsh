package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
)

type SystemMetrics struct {
	Metrics struct {
		CPUUsage    float64 `json:"cpuUsage"`
		MemoryUsage float64 `json:"memoryUsage"`
		DiskUsage   float64 `json:"diskUsage"`
	} `json:"metrics"`
	Timestamp string `json:"timestamp"`
}

type RegistrationRequest struct {
	Hostname string `json:"hostname"`
	OSInfo   struct {
		Platform string `json:"platform"`
		OS       string `json:"os"`
		Arch     string `json:"arch"`
		Release  string `json:"release,omitempty"`
	} `json:"osInfo"`
}

var (
	agentID string
	backendURL = "http://localhost:3001"
)

func main() {
	// Get system information for registration
	hostname, err := os.Hostname()
	if err != nil {
		fmt.Printf("Error getting hostname: %v\n", err)
		os.Exit(1)
	}

	hostInfo, err := host.Info()
	if err != nil {
		fmt.Printf("Error getting host info: %v\n", err)
		os.Exit(1)
	}

	// Register with backend
	regReq := RegistrationRequest{
		Hostname: hostname,
	}
	regReq.OSInfo.Platform = hostInfo.Platform
	regReq.OSInfo.OS = hostInfo.OS
	regReq.OSInfo.Arch = hostInfo.KernelArch
	regReq.OSInfo.Release = hostInfo.PlatformVersion

	regBody, err := json.Marshal(regReq)
	if err != nil {
		fmt.Printf("Error marshaling registration request: %v\n", err)
		os.Exit(1)
	}

	resp, err := http.Post(backendURL+"/register", "application/json", bytes.NewBuffer(regBody))
	if err != nil {
		fmt.Printf("Error registering with backend: %v\n", err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Printf("Registration failed with status: %d\n", resp.StatusCode)
		os.Exit(1)
	}

	var regResp struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&regResp); err != nil {
		fmt.Printf("Error decoding registration response: %v\n", err)
		os.Exit(1)
	}

	agentID = regResp.ID
	fmt.Printf("Registered with backend, agent ID: %s\n", agentID)

	// Start metrics collection loop
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		metrics, err := collectMetrics()
		if err != nil {
			fmt.Printf("Error collecting metrics: %v\n", err)
			continue
		}

		// Send metrics to backend
		metricsBody, err := json.Marshal(metrics)
		if err != nil {
			fmt.Printf("Error marshaling metrics: %v\n", err)
			continue
		}

		resp, err := http.Post(fmt.Sprintf("%s/%s/metrics", backendURL, agentID), "application/json", bytes.NewBuffer(metricsBody))
		if err != nil {
			fmt.Printf("Error sending metrics: %v\n", err)
			continue
		}
		resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			fmt.Printf("Metrics update failed with status: %d\n", resp.StatusCode)
			continue
		}

		fmt.Printf("Sent metrics: CPU: %.2f%%, Memory: %.2f%%\n", metrics.Metrics.CPUUsage, metrics.Metrics.MemoryUsage)
	}
}

func collectMetrics() (*SystemMetrics, error) {
	cpuPercent, err := cpu.Percent(time.Second, false)
	if err != nil {
		return nil, fmt.Errorf("error getting CPU usage: %v", err)
	}

	memInfo, err := mem.VirtualMemory()
	if err != nil {
		return nil, fmt.Errorf("error getting memory info: %v", err)
	}

	metrics := &SystemMetrics{}
	metrics.Metrics.CPUUsage = cpuPercent[0]
	metrics.Metrics.MemoryUsage = memInfo.UsedPercent
	metrics.Metrics.DiskUsage = 0 // TODO: Add disk usage
	metrics.Timestamp = time.Now().UTC().Format(time.RFC3339)

	return metrics, nil
}
