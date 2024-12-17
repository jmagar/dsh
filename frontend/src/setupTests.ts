// External dependencies
import '@testing-library/jest-dom';
import { vi } from 'vitest';

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

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class IntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// Mock ResizeObserver
class ResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});
