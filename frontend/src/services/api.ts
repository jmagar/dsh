import { LogMetadata } from '@dsh/shared';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { createLogMetadata, logger } from '../utils/logger';

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
    const logMetadata: Partial<LogMetadata> = {
      url: config.url ?? 'unknown',
      method: config.method ?? 'unknown',
    };

    logger.debug(`Sending request to: ${config.url ?? 'unknown'}`, 
      createLogMetadata('dsh-frontend', 'development', logMetadata)
    );
    return config;
  },
  (error: AxiosError) => {
    const logMetadata: Partial<LogMetadata> = {
      error: new Error(error.message),
    };

    logger.error('Request error', 
      createLogMetadata('dsh-frontend', 'development', logMetadata)
    );
    return Promise.reject(error);
  }
);

// Add a response interceptor for logging
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const logMetadata: Partial<LogMetadata> = {
      url: response.config.url ?? 'unknown',
      status: response.status.toString(),
    };

    logger.debug(`Response from ${response.config.url ?? 'unknown'}`, 
      createLogMetadata('dsh-frontend', 'development', logMetadata)
    );
    return response;
  },
  (error: AxiosError) => {
    const logMetadata: Partial<LogMetadata> = {
      error: new Error(error.message),
    };

    logger.error('Response error', 
      createLogMetadata('dsh-frontend', 'development', logMetadata)
    );
    return Promise.reject(error);
  }
);
