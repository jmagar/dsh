export interface WebSocketConfig {
  port: number;
  path: string;
  heartbeatInterval: number;
  maxPayloadSize: number;
}

export interface WebSocketClient {
  id: string;
  connected: boolean;
  lastHeartbeat: string;
} 