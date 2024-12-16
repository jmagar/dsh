export interface Agent {
  id?: string;
  name: string;
  host: string;
  port: number;
  apiKey?: string;
  sshKey?: string;
  connected?: boolean;
  lastSeen?: string;
  osInfo?: {
    os: string;
    platform: string;
    arch: string;
  };
}
