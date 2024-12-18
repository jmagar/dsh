import { Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';


import { ChatBot } from './ChatBot';
import { ChatDialog } from './ChatDialog';
import { getStyles } from './styles';

import { useChat } from '@/client/hooks/useChat';

interface ChatProps {
  initialSessionId?: string;
}

export function Chat({ initialSessionId }: ChatProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [selectedSessionId, setSelectedSessionId] = useState<string | undefined>(
    initialSessionId
  );

  const {
    messages,
    sessions,
    loading,
    error,
    sendMessage,
    createSession,
    deleteSession,
    refreshSessions,
  } = useChat({
    sessionId: selectedSessionId,
    onError: console.error,
  });

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  const handleCreateSession = async (name: string) => {
    try {
      const session = await createSession(name);
      setSelectedSessionId(session.id);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
      if (sessionId === selectedSessionId) {
        setSelectedSessionId(undefined);
      }
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <Paper sx={styles.root}>
      <Box sx={styles.container}>
        <ChatBot
          sessions={sessions}
          selectedSessionId={selectedSessionId}
          onSessionSelect={handleSessionSelect}
          onCreateSession={handleCreateSession}
          onDeleteSession={handleDeleteSession}
          onRefresh={refreshSessions}
          loading={loading}
          error={error}
        />
        {selectedSessionId && (
          <ChatDialog
            messages={messages}
            onSendMessage={sendMessage}
            loading={loading}
            error={error}
          />
        )}
      </Box>
    </Paper>
  );
}
