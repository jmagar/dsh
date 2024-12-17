export interface UnraidSystem {
  version: string;
  model: string;
  hostname: string;
  description?: string;
  regGUID: string;
  maxArraySize: number;
  maxCacheSize: number;
  alerts: UnraidAlert[];
  notifications: UnraidNotification[];
}

export interface UnraidDisk {
  device: string;
  id: string;
  name: string;
  type: 'data' | 'parity' | 'cache' | 'unassigned';
  status: 'DISK_OK' | 'DISK_INVALID' | 'DISK_DSBL' | 'DISK_NP' | 'DISK_NP_DSBL';
  size: number;
  used: number;
  free: number;
  temp: number;
  numReads: number;
  numWrites: number;
  numErrors: number;
  fsType: string;
  mounted: boolean;
  rotational: boolean;
  serial: string;
  model: string;
}

export interface UnraidArray {
  status: 'STARTED' | 'STOPPED' | 'STARTING' | 'STOPPING';
  size: number;
  used: number;
  free: number;
  protection: 'single' | 'dual' | 'triple' | 'none';
  devices: UnraidDisk[];
  sync: {
    status: 'synced' | 'syncing' | 'paused' | 'error';
    progress: number;
    speed: number;
    remainingTime: number;
  };
}

export interface UnraidShare {
  name: string;
  comment: string;
  security: 'public' | 'secure' | 'private';
  allocator: 'highwater' | 'mostfree' | 'fillup';
  splitLevel: 'auto' | 'never' | number;
  included: string[];
  excluded: string[];
  exportable: boolean;
  smbEnabled: boolean;
  nfsEnabled: boolean;
  cacheEnabled: boolean;
}

export interface UnraidDocker {
  enabled: boolean;
  version: string;
  storage: {
    driver: string;
    root: string;
  };
  network: {
    subnet: string;
    gateway: string;
    range: string;
  };
  containers: number;
  images: number;
  volumes: number;
}

export interface UnraidVM {
  enabled: boolean;
  pcis: string[];
  isolated: string[];
  memory: number;
  cores: number;
  machines: number;
}

export interface UnraidAlert {
  id: string;
  type: 'warning' | 'error' | 'notice';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  entity?: {
    type: 'disk' | 'array' | 'share' | 'docker' | 'vm';
    id: string;
  };
}

export interface UnraidNotification {
  id: string;
  type: 'system' | 'array' | 'disk' | 'docker' | 'vm' | 'ups' | 'user';
  importance: 'normal' | 'warning' | 'alert';
  subject: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface UnraidUPS {
  enabled: boolean;
  name: string;
  description?: string;
  driver: string;
  port: string;
  status: 'ONLINE' | 'ONBATT' | 'LOWBATT' | 'REPLBATT' | 'NOBATT' | 'COMMLOST';
  load: number;
  batteryCharge: number;
  timeLeft: number;
  temperature: number;
  inputVoltage: number;
  outputVoltage: number;
  lastTest: string;
}

export interface UnraidUser {
  name: string;
  description?: string;
  disabled: boolean;
  groups: string[];
  shares: Array<{
    name: string;
    access: 'read' | 'write' | 'none';
  }>;
  lastLogin?: string;
} 