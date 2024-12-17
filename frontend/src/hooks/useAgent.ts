import { useState, useEffect } from 'react';
import type { AgentStatus } from '@dsh/shared/types/agent.types.js';
import { fetchAgentStatus, updateAgentConfig } from '../api/agent.js';

interface UseAgentResult {
  status: AgentStatus | null;
  error: Error | null;
  isLoading: boolean;
  updateConfig: (config: Partial<AgentStatus['config']>) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useAgent(agentId: string, pollInterval = 5000): UseAgentResult {
  const [status, setStatus] = useState<AgentStatus | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAgentStatus(agentId);
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch agent status'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = async (config: Partial<AgentStatus['config']>) => {
    try {
      setIsLoading(true);
      await updateAgentConfig(agentId, config);
      await fetchStatus();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update agent config'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, pollInterval);
    return () => clearInterval(interval);
  }, [agentId, pollInterval]);

  return {
    status,
    error,
    isLoading,
    updateConfig,
    refetch: fetchStatus
  };
} 