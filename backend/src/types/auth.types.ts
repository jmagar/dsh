export interface AuthConfig {
  jwtSecret: string;
  jwtExpiry: string;
  refreshTokenExpiry: string;
  passwordHashRounds: number;
}

export interface TokenPayload {
  userId: string;
  username: string;
  roles: string[];
  exp: number;
} 