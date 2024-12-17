export interface NetworkInterface {
  name: string;
  type: 'ethernet' | 'wireless' | 'virtual' | 'loopback' | 'bridge' | 'bond';
  status: 'up' | 'down';
  mac: string;
  mtu: number;
  flags: string[];
  ipv4?: {
    address: string;
    netmask: string;
    broadcast?: string;
    gateway?: string;
    dhcp: boolean;
    dns?: string[];
  };
  ipv6?: {
    address: string;
    prefixLength: number;
    gateway?: string;
    dhcp: boolean;
    dns?: string[];
  };
  stats: {
    rxBytes: number;
    txBytes: number;
    rxPackets: number;
    txPackets: number;
    rxErrors: number;
    txErrors: number;
    rxDropped: number;
    txDropped: number;
  };
}

export interface NetworkConnection {
  id: string;
  type: 'tcp' | 'udp' | 'unix';
  state: 'established' | 'listen' | 'time_wait' | 'close_wait';
  localAddress: string;
  localPort: number;
  remoteAddress?: string;
  remotePort?: number;
  pid?: number;
  processName?: string;
  user?: string;
}

export interface NetworkRoute {
  destination: string;
  gateway: string;
  netmask: string;
  flags: string[];
  metric: number;
  interface: string;
}

export interface NetworkDNS {
  servers: string[];
  search: string[];
  options: string[];
  hosts: Array<{
    ip: string;
    hostnames: string[];
  }>;
}

export interface NetworkFirewall {
  enabled: boolean;
  defaultPolicy: 'accept' | 'drop' | 'reject';
  rules: Array<{
    id: string;
    chain: 'input' | 'output' | 'forward';
    protocol?: 'tcp' | 'udp' | 'icmp' | 'all';
    source?: string;
    destination?: string;
    sourcePort?: number | string;
    destinationPort?: number | string;
    action: 'accept' | 'drop' | 'reject';
    state?: string[];
    comment?: string;
  }>;
}

export interface NetworkBandwidth {
  interface: string;
  timestamp: string;
  interval: number;
  rx: {
    bytes: number;
    packets: number;
    errors: number;
    dropped: number;
  };
  tx: {
    bytes: number;
    packets: number;
    errors: number;
    dropped: number;
  };
}

export interface NetworkLatency {
  target: string;
  timestamp: string;
  rtt: {
    min: number;
    avg: number;
    max: number;
    mdev: number;
  };
  packetLoss: number;
}

export interface NetworkQoS {
  interface: string;
  enabled: boolean;
  defaultClass: string;
  classes: Array<{
    name: string;
    priority: number;
    rate: string;
    ceil: string;
    burst: string;
    quantum: number;
  }>;
  filters: Array<{
    match: {
      protocol?: string;
      source?: string;
      destination?: string;
      port?: number | string;
    };
    target: string;
    priority: number;
  }>;
}

export interface NetworkDHCP {
  enabled: boolean;
  interface: string;
  range: {
    start: string;
    end: string;
  };
  subnet: string;
  gateway: string;
  dns: string[];
  leaseTime: string;
  staticLeases: Array<{
    mac: string;
    ip: string;
    hostname?: string;
  }>;
  options: Record<string, string>;
} 