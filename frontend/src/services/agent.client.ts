import { LogMetadata } from '@dsh/shared';

import { DockerContainer } from '../types/docker.types';
import { logger } from '../utils/logger';

const BASE_URL = 'http://localhost:3001';
const WS_URL = 'ws://localhost:3001';

/** Error response structure from the agent API */
interface ErrorResponse {
  message: string;
  status: number;
}

/** Event emitted when a container's state changes */
interface ContainerEvent {
  type: 'container';
  action: 'start' | 'stop' | 'restart' | 'remove' | 'update';
  containerId: string;
  container?: DockerContainer;
}

/** Event emitted when an error occurs */
interface ErrorEvent {
  type: 'error';
  message: string;
}

/** Union type of all possible agent events */
type AgentEvent = ContainerEvent | ErrorEvent;

/**
 * WebSocket client for real-time communication with the agent.
 * Handles automatic reconnection and event parsing.
 */
export class AgentWebSocket {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private readonly agentId: string;
  private readonly onEvent: (event: AgentEvent) => void;

  /**
   * Creates a new WebSocket connection to the agent.
   * @param agentId - The ID of the agent to connect to
   * @param onEvent - Callback function to handle incoming events
   */
  constructor(agentId: string, onEvent: (event: AgentEvent) => void) {
    this.agentId = agentId;
    this.onEvent = onEvent;
    this.connect();
  }

  /**
   * Establishes a WebSocket connection to the agent.
   * Automatically handles reconnection on connection loss.
   */
  private connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(`${WS_URL}/agents/${this.agentId}/ws`);

    this.ws.onmessage = (event: MessageEvent): void => {
      try {
        const data = JSON.parse(event.data) as AgentEvent;
        this.onEvent(data);
      } catch (err) {
        logger.error(
          'Failed to parse WebSocket message',
          createErrorMetadata(err, { agentId: this.agentId })
        );
      }
    };

    this.ws.onerror = (): void => {
      logger.error(
        'WebSocket connection error',
        createErrorMetadata(new Error('WebSocket error'), { agentId: this.agentId })
      );
    };

    this.ws.onclose = (): void => {
      this.ws = null;
      // Reconnect after 5 seconds
      this.reconnectTimer = setTimeout(() => this.connect(), 5000);
    };
  }

  /**
   * Closes the WebSocket connection and cancels any pending reconnection attempts.
   */
  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

/**
 * Creates a standardized error metadata object for logging.
 * @param error - The error object or unknown value
 * @param metadata - Additional metadata to include in the log
 * @returns Formatted error metadata object
 */
function createErrorMetadata(
  error: unknown,
  metadata: Record<string, unknown>
): Partial<LogMetadata> {
  return {
    component: 'agent-client',
    error: error instanceof Error ? error : new Error('Unknown error'),
    message: error instanceof Error ? error.message : 'Unknown error',
    ...metadata,
  };
}

/**
 * Handles the response from the agent API, parsing JSON and handling errors.
 * @param response - The fetch Response object
 * @returns Parsed response data
 * @throws Error if the response is not OK
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage: string;
    try {
      const errorData = (await response.json()) as ErrorResponse;
      errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
    } catch {
      errorMessage = (await response.text()) || `HTTP error! status: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}

/**
 * Starts a Docker container via the agent.
 * @param agentId - The ID of the agent managing the container
 * @param containerId - The ID of the container to start
 * @throws Error if the operation fails
 */
export async function startContainer(agentId: string, containerId: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/agents/${agentId}/containers/${containerId}/start`, {
      method: 'POST',
    });
    await handleResponse<void>(response);
  } catch (error) {
    logger.error(
      'Failed to start container via agent',
      createErrorMetadata(error, { agentId, containerId })
    );
    throw error;
  }
}

/**
 * Stops a Docker container via the agent.
 * @param agentId - The ID of the agent managing the container
 * @param containerId - The ID of the container to stop
 * @throws Error if the operation fails
 */
export async function stopContainer(agentId: string, containerId: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/agents/${agentId}/containers/${containerId}/stop`, {
      method: 'POST',
    });
    await handleResponse<void>(response);
  } catch (error) {
    logger.error(
      'Failed to stop container via agent',
      createErrorMetadata(error, { agentId, containerId })
    );
    throw error;
  }
}

/**
 * Restarts a Docker container via the agent.
 * @param agentId - The ID of the agent managing the container
 * @param containerId - The ID of the container to restart
 * @throws Error if the operation fails
 */
export async function restartContainer(agentId: string, containerId: string): Promise<void> {
  try {
    const response = await fetch(
      `${BASE_URL}/agents/${agentId}/containers/${containerId}/restart`,
      {
        method: 'POST',
      }
    );
    await handleResponse<void>(response);
  } catch (error) {
    logger.error(
      'Failed to restart container via agent',
      createErrorMetadata(error, { agentId, containerId })
    );
    throw error;
  }
}

/**
 * Removes a Docker container via the agent.
 * @param agentId - The ID of the agent managing the container
 * @param containerId - The ID of the container to remove
 * @throws Error if the operation fails
 */
export async function removeContainer(agentId: string, containerId: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/agents/${agentId}/containers/${containerId}`, {
      method: 'DELETE',
    });
    await handleResponse<void>(response);
  } catch (error) {
    logger.error(
      'Failed to remove container via agent',
      createErrorMetadata(error, { agentId, containerId })
    );
    throw error;
  }
}

/**
 * Lists all Docker containers managed by the agent.
 * @param agentId - The ID of the agent to query
 * @returns Array of container information
 * @throws Error if the operation fails
 */
export async function listContainers(agentId: string): Promise<DockerContainer[]> {
  try {
    const response = await fetch(`${BASE_URL}/agents/${agentId}/containers`);
    return handleResponse<DockerContainer[]>(response);
  } catch (error) {
    logger.error('Failed to list containers via agent', createErrorMetadata(error, { agentId }));
    throw error;
  }
}
