import { ReactNode } from 'react';

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
