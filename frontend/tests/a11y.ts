/* eslint-disable no-console */
import { type IncomingMessage } from 'node:http';
import * as http from 'node:http';

import type { Logger, LogMetadata } from '@dsh/shared/utils/logger';
import type { HTMLElement } from 'node-html-parser';
import { parse } from 'node-html-parser';

interface A11yCheck {
  element: string;
  issue: string;
  severity: 'error' | 'warning';
}

// Create a simple logger implementation
const logger: Logger = {
  error(message: string, metadata?: Partial<LogMetadata>): void {
    console.error(message, metadata);
  },

  warn(message: string, metadata?: Partial<LogMetadata>): void {
    console.warn(message, metadata);
  },

  info(message: string, metadata?: Partial<LogMetadata>): void {
    console.info(message, metadata);
  },

  debug(message: string, metadata?: Partial<LogMetadata>): void {
    console.debug(message, metadata);
  },
};

function checkAccessibility(html: string): A11yCheck[] {
  const issues: A11yCheck[] = [];
  const root = parse(html);

  // Check for images without alt text
  const images = root.querySelectorAll('img');
  images.forEach((img: HTMLElement) => {
    const alt = img.getAttribute('alt');
    if (typeof alt !== 'string' || alt.trim().length === 0) {
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
    if (typeof id === 'string' && id.trim().length > 0) {
      const hasLabel = root.querySelector(`label[for="${id.trim()}"]`) !== null;
      if (!hasLabel) {
        issues.push({
          element: 'input',
          issue: 'Input missing associated label',
          severity: 'error',
        });
      }
    }
  });

  // Check for proper heading hierarchy
  let lastHeadingLevel = 0;
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading: HTMLElement) => {
    const tagName = heading.tagName.toLowerCase();
    const level = parseInt(tagName.charAt(1), 10);

    // Explicitly handle NaN case first
    if (Number.isNaN(level)) {
      return;
    }

    // Only check for skipped levels if we have a valid previous level
    if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
      issues.push({
        element: tagName,
        issue: 'Skipped heading level',
        severity: 'warning',
      });
    }
    lastHeadingLevel = level;
  });

  // Check for ARIA roles
  const ariaElements = root.querySelectorAll('[role]');
  ariaElements.forEach((element: HTMLElement) => {
    const role = element.getAttribute('role');
    const tagName = element.tagName.toLowerCase();
    if (typeof role === 'string' && role.trim() === 'button' && tagName !== 'button') {
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
    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      reject(new Error('Invalid URL provided'));
      return;
    }

    http
      .get(url, (res: IncomingMessage) => {
        const statusCode = res.statusCode ?? 0;
        if (statusCode < 200 || statusCode >= 300) {
          reject(new Error(`HTTP error! status: ${statusCode}`));
          return;
        }

        let data = '';
        res.on('data', (chunk: string) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const issues = checkAccessibility(data);
            if (issues.length > 0) {
              const issueMessages = issues.map(i => `${i.severity}: ${i.issue} in <${i.element}>`);
              logger.warn('Accessibility issues found:', {
                component: 'accessibility',
                message: issueMessages.join('\n'),
                metrics: {
                  issueCount: issues.length,
                  errorCount: issues.filter(i => i.severity === 'error').length,
                  warningCount: issues.filter(i => i.severity === 'warning').length,
                },
              });
            } else {
              logger.info('No accessibility issues found');
            }
            resolve();
          } catch (error) {
            reject(error instanceof Error ? error : new Error('Unknown error occurred'));
          }
        });
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });
}

// Run the checks
async function main(): Promise<void> {
  const urls = process.argv.slice(2);

  if (urls.length === 0) {
    logger.error('No URLs provided');
    process.exit(1);
  }

  try {
    logger.info('Starting accessibility checks', {
      component: 'accessibility',
      metrics: { urlCount: urls.length },
    });

    const checkPromises = urls.map(url => {
      return fetchAndCheck(url).catch(error => {
        logger.error(`Failed to check URL: ${url}`, {
          component: 'accessibility',
          error: error instanceof Error ? error : new Error(String(error)),
          target: url,
        });
        throw error; // Re-throw to maintain error state
      });
    });

    const results: PromiseSettledResult<void>[] = await Promise.allSettled(checkPromises);

    const successCount = results.filter(
      (r): r is PromiseFulfilledResult<void> => r.status === 'fulfilled'
    ).length;
    const failureCount = results.filter(
      (r): r is PromiseRejectedResult => r.status === 'rejected'
    ).length;

    logger.info('Accessibility checks complete', {
      component: 'accessibility',
      metrics: {
        totalUrls: urls.length,
        successCount,
        failureCount,
      },
    });

    if (failureCount > 0) {
      process.exit(1);
    }
  } catch (error) {
    logger.error('Accessibility check failed', {
      component: 'accessibility',
      error: error instanceof Error ? error : new Error(String(error)),
    });
    process.exit(1);
  }
}

if (require.main === module) {
  void main();
}

export { checkAccessibility, fetchAndCheck };
