/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';

// Mock console methods to avoid noise in test output
const mockConsole = {
  ...console,
  log: jest.fn() as jest.Mock<typeof console.log>,
  debug: jest.fn() as jest.Mock<typeof console.debug>,
  info: jest.fn() as jest.Mock<typeof console.info>,
  warn: jest.fn() as jest.Mock<typeof console.warn>,
  error: jest.fn() as jest.Mock<typeof console.error>,
} as Console;

global.console = mockConsole;
