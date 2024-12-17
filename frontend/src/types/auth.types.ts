export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface TokenPayload {
  sub: string;
  username: string;
  roles: string[];
  exp: number;
  iat: number;
} 