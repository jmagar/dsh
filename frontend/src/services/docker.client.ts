import type { DockerContainer } from '../store/types';

interface ApiResponse<T> {
  data: T;
  status: number;
}

function isDockerContainer(data: unknown): data is DockerContainer {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'status' in data &&
    'image' in data
  );
}

function isDockerContainerArray(data: unknown): data is DockerContainer[] {
  return Array.isArray(data) && data.every(isDockerContainer);
}

class DockerClient {
  private baseUrl = '/api/docker';

  async getContainers(): Promise<ApiResponse<DockerContainer[]>> {
    const response = await fetch(`${this.baseUrl}/containers`);
    const rawData = await response.json();
    
    if (!isDockerContainerArray(rawData)) {
      throw new Error('Invalid response format from server');
    }
    
    return { data: rawData, status: response.status };
  }

  async startContainer(containerId: string): Promise<ApiResponse<DockerContainer>> {
    const response = await fetch(`${this.baseUrl}/containers/${containerId}/start`, {
      method: 'POST',
    });
    const rawData = await response.json();
    
    if (!isDockerContainer(rawData)) {
      throw new Error('Invalid response format from server');
    }
    
    return { data: rawData, status: response.status };
  }

  async stopContainer(containerId: string): Promise<ApiResponse<DockerContainer>> {
    const response = await fetch(`${this.baseUrl}/containers/${containerId}/stop`, {
      method: 'POST',
    });
    const rawData = await response.json();
    
    if (!isDockerContainer(rawData)) {
      throw new Error('Invalid response format from server');
    }
    
    return { data: rawData, status: response.status };
  }
}

export const dockerClient = new DockerClient(); 