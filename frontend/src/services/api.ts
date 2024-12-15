import { LogMetadata } from '@dsh/shared';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { logger } from '../utils/logger';

const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3001';

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
