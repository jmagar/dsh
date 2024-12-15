import { Socket, io } from 'socket.io-client';

import { createLogMetadata, logger } from './logger';

// Custom error class for WebSocket errors
class WebSocketError extends Error {
  readonly component: string;

  constructor(message: string, component = 'websocket-test') {
    super(message);
    this.name = 'WebSocketError';
    this.component = component;
    Object.setPrototypeOf(this, WebSocketError.prototype);
  }
}

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
      const baseSocketUrl = process.env.REACT_APP_WEBSOCKET_URL ?? '';
      logger.debug('WebSocket Initialization', 
        createLogMetadata('websocket-test')
      );
      
      if (typeof baseSocketUrl !== 'string' || baseSocketUrl.trim() === '') {
        throw new WebSocketError('WebSocket URL not configured');
      }

      const socketUrl = `${baseSocketUrl}/ws/agent`;
      logger.debug('WebSocket Connection Attempt', 
        createLogMetadata('websocket-test')
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
        logger.debug('WebSocket Connected', 
          createLogMetadata('websocket-test')
        );
      });

      this.socket.on('disconnect', (_reason: string) => {
        logger.info('WebSocket disconnected', createLogMetadata('websocket-test'));
      });

      this.socket.on('error', (error: Error) => {
        const wsError = new WebSocketError(
          error instanceof Error ? error.message : String(error)
        );
        logger.error('WebSocket Error', 
          createLogMetadata('websocket-test', wsError)
        );
      });
    } catch (error) {
      const wsError = error instanceof WebSocketError 
        ? error 
        : new WebSocketError(error instanceof Error ? error.message : String(error));
      
      logger.error('WebSocket Initialization Failed', 
        createLogMetadata('websocket-test', wsError)
      );
    }
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket === null) {
        this.initializeSocket();
      }

      // After initialization, check if socket exists
      if (this.socket === null) {
        reject(new WebSocketError('Failed to initialize WebSocket'));
        return;
      }

      if (this.socket.connected) {
        resolve();
        return;
      }

      const socket = this.socket;
      socket.on('connect', () => resolve());
      socket.on('error', (error: Error) => {
        const wsError = new WebSocketError(
          error instanceof Error ? error.message : String(error)
        );
        logger.error('WebSocket Connection Error', 
          createLogMetadata('websocket-test', wsError)
        );
        reject(wsError);
      });
    });
  }

  public sendTestMessage(message: string): void {
    const socket = this.socket;
    if (socket === null) {
      throw new WebSocketError('WebSocket not initialized');
    }

    logger.debug('Sending Test Message', 
      createLogMetadata('websocket-test')
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
