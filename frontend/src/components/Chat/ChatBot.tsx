import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { ChatSession } from '@/client/types/chat.types';
import { getStyles } from './styles';

interface ChatBotProps {
  sessions: ChatSession[];
  selectedSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onCreateSession: (name: string) => Promise<void>;
  onDeleteSession: (sessionId: string) => Promise<void>;
  onRefresh: () => void;
  loading?: boolean;
  error?: string | null;
}

export function ChatBot({
  sessions,
  selectedSessionId,
  onSessionSelect,
  onCreateSession,
  onDeleteSession,
  onRefresh,
  loading,
  error,
}: ChatBotProps) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleCreateSession = async () => {
    if (!newSessionName.trim()) return;

    await onCreateSession(newSessionName.trim());
    setCreateDialogOpen(false);
    setNewSessionName('');
  };

  const handleDeleteSession = async () => {
    if (!sessionToDelete) return;

    await onDeleteSession(sessionToDelete);
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  if (error) {
    return (
      <Box sx={styles.sidebar}>
        <Alert
          severity="error"
          action={
            <IconButton color="inherit" size="small" onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={styles.sidebar}>
      <Box sx={styles.sidebarHeader}>
        <Typography variant="h6">Chat Sessions</Typography>
        <Box display="flex" gap={1}>
          <Tooltip title="New Chat">
            <IconButton onClick={() => setCreateDialogOpen(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <List sx={styles.sessionList}>
        {sessions.map((session) => (
          <ListItem
            key={session.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => {
                  setSessionToDelete(session.id);
                  setDeleteDialogOpen(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              selected={session.id === selectedSessionId}
              onClick={() => onSessionSelect(session.id)}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText
                primary={session.name}
                secondary={new Date(session.createdAt).toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Create Session Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>New Chat Session</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Session Name"
            fullWidth
            variant="outlined"
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handleCreateSession()}
            variant="contained"
            disabled={!newSessionName.trim() || loading}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Session Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Chat Session</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this chat session? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => void handleDeleteSession()}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {loading && (
        <Box sx={styles.loadingOverlay}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
