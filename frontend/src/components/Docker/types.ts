import type { ReactNode } from 'react';
import type { DockerContainer } from '@dsh/shared/types';

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface DockerManagerProps {
  hostId: string;
  userId: string;
}

export interface DockerTabProps {
  label: string;
  icon: ReactNode;
  badgeContent?: number;
}

export interface DockerMenuItemProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  divider?: boolean;
}

export interface DockerStats {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  containers: number;
}

export interface DockerManagerState {
  containers: DockerContainer[];
  loading: boolean;
  error: string | null;
  stats: DockerStats;
}

export interface DockerContainerProps {
  container: DockerContainer;
  onAction: (containerId: string, action: 'start' | 'stop') => Promise<void>;
  onSelect: (containerId: string) => void;
  selected: boolean;
}

export interface DockerComposeConfig {
  status: string;
  content: string;
  name: string;
}
