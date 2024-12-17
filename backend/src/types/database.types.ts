export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
} 