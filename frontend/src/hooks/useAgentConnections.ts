import { useState, useCallback, useEffect } from 'react';
import { Agent, AgentConnection } from '@/client/types/agent.types';

interface UseAgentConnectionsProps {
  refreshInterval?: number;
}

export function useAgentConnections({ refreshInterval = 5000 }: UseAgentConnectionsProps = {}) {
  const [connections, setConnections] = useState<AgentConnection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/agents/connections');
      if (!response.ok) {
        throw new Error('Failed to fetch agent connections');
      }

      const data = await response.json();
      setConnections(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agent connections');
    } finally {
      setLoading(false);
    }
  }, []);

  const connectAgent = useCallback(async (agent: Agent) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/agents/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
      });

      if (!response.ok) {
        throw new Error('Failed to connect agent');
      }

      await fetchConnections();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect agent');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchConnections]);

  const disconnectAgent = useCallback(async (agentId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/agents/${agentId}/disconnect`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to disconnect agent');
      }

      await fetchConnections();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect agent');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchConnections]);

  const testConnection = useCallback(async (agent: Agent) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/agents/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
      });

      if (!response.ok) {
        throw new Error('Connection test failed');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection test failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchConnections();

    if (refreshInterval > 0) {
      const interval = setInterval(() => void fetchConnections(), refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchConnections, refreshInterval]);

  return {
    connections,
    loading,
    error,
    connectAgent,
    disconnectAgent,
    testConnection,
    refreshConnections: fetchConnections,
  };
}
