import { type IncomingMessage } from 'node:http';
import * as http from 'node:http';

import type { HTMLElement } from 'node-html-parser';
import { parse } from 'node-html-parser';

import type { Logger, LogMetadata } from '../../shared/src/utils/logger';
import { LogLevel } from '../../shared/src/utils/logger';

interface A11yCheck {
  element: string;
  issue: string;
  severity: 'error' | 'warning';
}

// Create a simple logger implementation
const logger: Logger = {
  error(message: string, metadata?: Partial<LogMetadata>) {
    console.error(LogLevel.ERROR, message, metadata);
  },
  warn(message: string, metadata?: Partial<LogMetadata>) {
    console.warn(LogLevel.WARN, message, metadata);
  },
  info(message: string, metadata?: Partial<LogMetadata>) {
    console.info(LogLevel.INFO, message, metadata);
  },
  debug(message: string, metadata?: Partial<LogMetadata>) {
    console.debug(LogLevel.DEBUG, message, metadata);
  },
};

function checkAccessibility(html: string): A11yCheck[] {
  const issues: A11yCheck[] = [];
  const root = parse(html);

  // Check for images without alt text
  const images = root.querySelectorAll('img');
  images.forEach((img: HTMLElement) => {
    const alt = img.getAttribute('alt');
    if (alt === null || alt === '') {
      issues.push({
        element: 'img',
        issue: 'Missing alt text',
        severity: 'error',
      });
    }
  });

  // Check for form inputs without labels
  const inputs = root.querySelectorAll('input');
  inputs.forEach((input: HTMLElement) => {
    const id = input.getAttribute('id');
    const hasLabel = id ? root.querySelector(`label[for="${id}"]`) !== null : false;
    if (id && !hasLabel) {
      issues.push({
        element: 'input',
        issue: 'Input missing associated label',
        severity: 'error',
      });
    }
  });

  // Check for proper heading hierarchy
  let lastHeadingLevel = 0;
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading: HTMLElement) => {
    const tagName = heading.tagName.toLowerCase();
    const level = parseInt(tagName.charAt(1), 10);
    if (!Number.isNaN(level) && lastHeadingLevel > 0 && level - lastHeadingLevel > 1) {
      issues.push({
        element: tagName,
        issue: 'Skipped heading level',
        severity: 'warning',
      });
    }
    if (!Number.isNaN(level)) {
      lastHeadingLevel = level;
    }
  });

  // Check for ARIA roles
  const ariaElements = root.querySelectorAll('[role]');
  ariaElements.forEach((element: HTMLElement) => {
    const role = element.getAttribute('role');
    const tagName = element.tagName.toLowerCase();
    if (role === 'button' && tagName !== 'button') {
      issues.push({
        element: tagName,
        issue: 'Non-button element with button role should be a <button>',
        severity: 'warning',
      });
    }
  });

  return issues;
}

async function fetchAndCheck(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    http
      .get(url, (res: IncomingMessage) => {
        let data = '';
        res.on('data', (chunk: Buffer) => {
          data += chunk.toString();
        });
        res.on('end', () => {
          try {
            const issues = checkAccessibility(data);

            if (issues.length > 0) {
              const metadata: LogMetadata = {
                component: 'a11y',
                message: `Found ${issues.length} issues`,
                metrics: {
                  totalIssues: issues.length,
                  errorCount: issues.filter(i => i.severity === 'error').length,
                  warningCount: issues.filter(i => i.severity === 'warning').length,
                },
                target: url,
              };
              logger.error('Accessibility issues found', metadata);

              issues.forEach(issue => {
                const issueMetadata: LogMetadata = {
                  component: 'a11y',
                  message: `${issue.severity.toUpperCase()}: ${issue.issue}`,
                  target: issue.element,
                };
                logger.warn(issue.issue, issueMetadata);
              });

              if (issues.some(i => i.severity === 'error')) {
                process.exit(1);
              }
            } else {
              const metadata: LogMetadata = {
                component: 'a11y',
                message: 'No issues found',
                target: url,
              };
              logger.info('No accessibility issues found', metadata);
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

// Run the checks
async function main(): Promise<void> {
  const urls = [
    'http://localhost:3000',
    'http://localhost:3000/servers',
    'http://localhost:3000/metrics',
  ];

  try {
    await Promise.all(urls.map(fetchAndCheck));
    const metadata: LogMetadata = {
      component: 'a11y',
      message: 'Checks complete',
      metrics: {
        totalUrls: urls.length,
      },
    };
    logger.info('Accessibility checks complete', metadata);
  } catch (error) {
    const metadata: LogMetadata = {
      component: 'a11y',
      message: 'Check failed',
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
    logger.error('Accessibility check failed', metadata);
    process.exit(1);
  }
}

if (require.main === module) {
  void main();
}

export { checkAccessibility, fetchAndCheck };
