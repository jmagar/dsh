import type { LogMetadata } from '@dsh/shared';
import axios from 'axios';
import type { 
  AxiosInstance, 
  InternalAxiosRequestConfig, 
  AxiosResponse,
  AxiosError 
} from 'axios';

import { logger } from '../utils/logger';
import type { AgentConnection, AgentMetrics, TestResult } from '../components/AgentManager/types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for logging and potential token handling
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const logMetadata: LogMetadata = {
      url: config.url ?? 'unknown',
      method: config.method ?? 'unknown',
      component: 'api-client',
    };

    logger.debug(`Sending request to: ${config.url ?? 'unknown'}`, logMetadata);
    return config;
  },
  (error: Error | AxiosError) => {
    const logMetadata: LogMetadata = {
      error,
      component: 'api-client',
    };

    logger.error('Request error', logMetadata);
    return Promise.reject(error);
  }
);

// Add a response interceptor for logging
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const logMetadata: LogMetadata = {
      url: response.config.url ?? 'unknown',
      status: response.status.toString(),
      component: 'api-client',
    };

    logger.debug(`Response from ${response.config.url ?? 'unknown'}`, logMetadata);
    return response;
  },
  (error: Error | AxiosError) => {
    const logMetadata: LogMetadata = {
      error,
      component: 'api-client',
    };

    logger.error('Response error', logMetadata);
    return Promise.reject(error);
  }
);

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function handleApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): Promise<T> {
  const { data: apiResponse } = response;
  if (!apiResponse.success || !apiResponse.data) {
    throw new Error(apiResponse.error || 'Unknown API error');
  }
  return apiResponse.data;
}

export async function connectToAgent(agent: AgentConnection): Promise<AgentConnection> {
  const response = await apiClient.post<ApiResponse<AgentConnection>>('/api/agents/connect', agent);
  return handleApiResponse(response);
}

export async function disconnectFromAgent(agentId: string): Promise<void> {
  const response = await apiClient.post<ApiResponse<void>>(`/api/agents/${agentId}/disconnect`);
  return handleApiResponse(response);
}

export async function testAgentConnection(agent: AgentConnection): Promise<TestResult> {
  const response = await apiClient.post<ApiResponse<TestResult>>('/api/agents/test', agent);
  return handleApiResponse(response);
}

export async function fetchAgentMetrics(agentId: string): Promise<AgentMetrics> {
  const response = await apiClient.get<ApiResponse<AgentMetrics>>(`/api/agents/${agentId}/metrics`);
  return handleApiResponse(response);
}

export async function refreshAgentConnections(): Promise<AgentConnection[]> {
  const response = await apiClient.get<ApiResponse<AgentConnection[]>>('/api/agents');
  return handleApiResponse(response);
}
