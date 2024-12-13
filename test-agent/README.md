# DSH Test Agent

This is a simple Go agent that collects system metrics and sends them to the DSH backend server via WebSocket connection.

## Features

- Collects system metrics every 5 seconds:
  - CPU usage
  - Memory usage
  - OS information
  - Hostname
- Establishes WebSocket connection with the backend
- Graceful shutdown on interrupt signal

## Building

```bash
go mod download
go build -o dsh-agent
```

## Running

```bash
# Connect to local backend
./dsh-agent

# Connect to specific server
./dsh-agent -server your-server:3000
```

## Metrics Format

The agent sends metrics in the following JSON format:

```json
{
  "hostname": "machine-name",
  "ipAddress": "127.0.0.1",
  "cpuUsage": 25.5,
  "memoryUsage": 60.2,
  "osInfo": {
    "platform": "windows",
    "os": "windows",
    "arch": "amd64"
  },
  "timestamp": "2024-12-12T16:30:00Z"
}
```
