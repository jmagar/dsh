// External dependencies
import '@testing-library/jest-dom';

// Mock console methods to avoid noise in test output
const mockConsole: Console = {
  ...console,
  log: jest.fn().mockImplementation(() => {}),
  debug: jest.fn().mockImplementation(() => {}),
  info: jest.fn().mockImplementation(() => {}),
  warn: jest.fn().mockImplementation(() => {}),
  error: jest.fn().mockImplementation(() => {}),
  trace: jest.fn().mockImplementation(() => {}),
  group: jest.fn().mockImplementation(() => {}),
  groupCollapsed: jest.fn().mockImplementation(() => {}),
  groupEnd: jest.fn().mockImplementation(() => {}),
  table: jest.fn().mockImplementation(() => {}),
  time: jest.fn().mockImplementation(() => {}),
  timeEnd: jest.fn().mockImplementation(() => {})
} as Console;

// Assign mocked console globally
global.console = mockConsole;

// Optional: Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
