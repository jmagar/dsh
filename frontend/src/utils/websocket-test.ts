import { io, Socket } from 'socket.io-client';

import { SystemMetrics } from '../shared/types';

import { logger, createLogMetadata } from './logger';

export class WebSocketTest {
  private static instance: WebSocketTest | null = null;
  private socket: Socket | null = null;

  constructor() {
    if (WebSocketTest.instance !== null) {
      return WebSocketTest.instance;
    }

    this.initializeSocket();
    WebSocketTest.instance = this;
  }

  private initializeSocket(): void {
    try {
      const baseSocketUrl = process.env.REACT_APP_WEBSOCKET_URL;
      logger.debug('WebSocket Initialization', 
        createLogMetadata('websocket-test', undefined, {
          component: 'websocket-test'
        })
      );
      
      if (typeof baseSocketUrl !== 'string' || baseSocketUrl.length === 0) {
        throw new Error('WebSocket URL not configured');
      }

      const socketUrl = `${baseSocketUrl}/ws/agent`;
      logger.debug('WebSocket Connection Attempt', 
        createLogMetadata('websocket-test', undefined, {
          component: 'websocket-test',
          url: baseSocketUrl
        })
      );

      this.socket = io(socketUrl, {
        transports: ['websocket'],
        forceNew: true,
        reconnection: true,
        timeout: 5000,
        withCredentials: false,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        logger.info('WebSocket Connected', 
          createLogMetadata('websocket-test', undefined, {
            component: 'websocket-test'
          })
        );
      });

      this.socket.on('connect_error', (error) => {
        logger.error('WebSocket Connection Error', 
          createLogMetadata('websocket-test', new Error(String(error)), {
            component: 'websocket-test'
          })
        );
      });

      this.socket.on('disconnect', () => {
        logger.warn('WebSocket Disconnected', 
          createLogMetadata('websocket-test', undefined, {
            component: 'websocket-test'
          })
        );
      });

      this.setupSocketListeners();
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      logger.error('WebSocket Initialization Failed', 
        createLogMetadata('websocket-test', errorObj, {
          component: 'websocket-test'
        })
      );
    }
  }

  private setupSocketListeners(): void {
    const socket = this.socket;
    if (socket === null) {
      logger.error('Cannot setup listeners: WebSocket not initialized',
        createLogMetadata('websocket-test', new Error('WebSocket not initialized'), {
          component: 'websocket-test'
        })
      );
      return;
    }

    socket.on('connect', () => {
      logger.info('WebSocket Connected', 
        createLogMetadata('websocket-test', undefined, {
          component: 'websocket-test'
        })
      );
    });

    socket.on('metrics', (data: SystemMetrics) => {
      logger.info('Received Metrics', 
        createLogMetadata('websocket-test', undefined, {
          component: 'websocket-test'
        })
      );
      logger.debug('Received Metrics', 
        createLogMetadata('websocket-test', undefined, {
          component: 'websocket-test',
          metrics: {
            cpuUsage: data.cpuUsage,
            memoryUsage: data.memoryUsage
          }
        })
      );
    });

    socket.on('connect_error', (error: Error) => {
      logger.error('WebSocket Connection Error', 
        createLogMetadata('websocket-test', error, {
          component: 'websocket-test'
        })
      );
    });

    socket.on('disconnect', () => {
      logger.info('WebSocket Disconnected', 
        createLogMetadata('websocket-test', undefined, {
          component: 'websocket-test'
        })
      );
    });
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket === null) {
        this.initializeSocket();
      }

      // After initialization, check if socket exists
      if (this.socket === null) {
        reject(new Error('Failed to initialize WebSocket'));
        return;
      }

      if (this.socket.connected === true) {
        resolve();
        return;
      }

      const socket = this.socket;
      socket.on('connect', () => resolve());
      socket.on('connect_error', (error: Error) => {
        logger.error('WebSocket Connection Error', 
          createLogMetadata('websocket-test', error, {
            component: 'websocket-test'
          })
        );
        reject(error);
      });
    });
  }

  public sendTestMessage(message: string): void {
    const socket = this.socket;
    if (socket === null) {
      throw new Error('WebSocket not initialized');
    }

    logger.debug('Sending Test Message', 
      createLogMetadata('websocket-test', undefined, {
        component: 'websocket-test',
        message: message
      })
    );
    socket.emit('test_message', message);
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public disconnect(): void {
    const socket = this.socket;
    if (socket === null) {
      return;
    }
    socket.disconnect();
  }
}

export const websocketTest = new WebSocketTest();
