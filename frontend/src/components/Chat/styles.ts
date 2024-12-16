import { Theme, alpha } from '@mui/material';

export const getStyles = (theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  container: {
    display: 'flex',
    height: '100%',
  },
  sidebar: {
    width: 300,
    borderRight: 1,
    borderColor: 'divider',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  sidebarHeader: {
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionList: {
    flex: 1,
    overflow: 'auto',
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  },
  messageContainer: {
    flex: 1,
    overflow: 'auto',
    p: 2,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0.5,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    px: 1,
  },
  timestamp: {
    color: 'text.secondary',
  },
  messageBubble: {
    maxWidth: '70%',
    p: 1.5,
    borderRadius: 2,
  },
  userBubble: {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  botBubble: {
    bgcolor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.5)
      : alpha(theme.palette.background.paper, 0.9),
  },
  messageText: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word' as const,
    margin: 0,
    fontFamily: 'monospace',
  },
  inputContainer: {
    p: 2,
    borderTop: 1,
    borderColor: 'divider',
    display: 'flex',
    gap: 1,
  },
  input: {
    '& .MuiInputBase-root': {
      borderRadius: 2,
    },
  },
  sendButton: {
    alignSelf: 'flex-end',
  },
  errorAlert: {
    borderRadius: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
});
