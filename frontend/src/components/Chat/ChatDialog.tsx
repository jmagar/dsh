import {
  Send as SendIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
} from '@mui/icons-material';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState, useRef, useEffect } from 'react';

import { getStyles } from './styles';

import { Message } from '@/client/types/chat.types';


interface ChatDialogProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  loading?: boolean;
  error?: string | null;
}

export function ChatDialog({
  messages,
  onSendMessage,
  loading,
  error,
}: ChatDialogProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    onSendMessage(message.trim());
    setMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={styles.chatContainer}>
      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      <Box sx={styles.messageContainer}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              ...styles.messageWrapper,
              ...(msg.role === 'user'
                ? styles.userMessage
                : styles.botMessage),
            }}
          >
            <Box sx={styles.messageHeader}>
              {msg.role === 'user' ? (
                <PersonIcon fontSize="small" />
              ) : (
                <BotIcon fontSize="small" />
              )}
              <Typography variant="caption" sx={styles.timestamp}>
                {new Date(msg.timestamp).toLocaleString()}
              </Typography>
            </Box>
            <Paper
              elevation={1}
              sx={{
                ...styles.messageBubble,
                ...(msg.role === 'user'
                  ? styles.userBubble
                  : styles.botBubble),
              }}
            >
              <Typography
                variant="body1"
                sx={styles.messageText}
                component="pre"
              >
                {msg.content}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={styles.inputContainer}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          sx={styles.input}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={!message.trim() || loading}
          sx={styles.sendButton}
        >
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
