import type { IncomingMessage } from 'http';
import * as http from 'http';

import type { HTMLElement } from 'node-html-parser';
import { parse } from 'node-html-parser';

import { logger } from './logger';

export interface A11yCheck {
  element: string;
  issue: string;
  severity: 'error' | 'warning' | 'info';
}

function checkAccessibility(html: string): A11yCheck[] {
  const issues: A11yCheck[] = [];
  const root = parse(html);

  // Check for images without alt text
  const images = root.querySelectorAll('img');
  images.forEach((img: HTMLElement) => {
    const alt = img.getAttribute('alt');
    if (alt === null || alt === undefined || alt.trim().length === 0) {
      issues.push({
        element: 'img',
        issue: 'Missing alt text',
        severity: 'error',
      });
    }
  });

  // Check for inputs without labels
  const inputs = root.querySelectorAll('input');
  inputs.forEach((input: HTMLElement) => {
    const id = input.getAttribute('id');
    if (id !== null && id !== undefined && id.trim().length > 0) {
      const label = root.querySelector(`label[for="${id}"]`);
      if (!label) {
        issues.push({
          element: 'input',
          issue: 'Input missing associated label',
          severity: 'error',
        });
      }
    }
  });

  // Check for skipped heading levels
  let lastHeadingLevel = 0;
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading: HTMLElement) => {
    const level = parseInt(heading.tagName.substring(1), 10);
    if (lastHeadingLevel > 0 && level - lastHeadingLevel > 1) {
      issues.push({
        element: heading.tagName.toLowerCase(),
        issue: 'Skipped heading level',
        severity: 'warning',
      });
    }
    lastHeadingLevel = level;
  });

  // Check for non-button elements with button role
  const buttonRoles = root.querySelectorAll('[role="button"]');
  buttonRoles.forEach((element: HTMLElement) => {
    if (element.tagName.toLowerCase() !== 'button') {
      issues.push({
        element: element.tagName.toLowerCase(),
        issue: 'Non-button element with button role should be a <button>',
        severity: 'warning',
      });
    }
  });

  return issues;
}

export async function runAccessibilityChecks(urls: string[]): Promise<void> {
  try {
    for (const url of urls) {
      await new Promise<void>((resolve, reject) => {
        http
          .get(url, (res: IncomingMessage) => {
            let data = '';
            res.on('data', (chunk: string) => {
              data += chunk;
            });
            res.on('end', () => {
              const issues = checkAccessibility(data);

              // Log check results
              logger.info(`Accessibility check results for ${url}`, {
                component: 'accessibility',
                target: url,
                metrics: {
                  total_issues: issues.length,
                  error_count: issues.filter(i => i.severity === 'error').length,
                  warning_count: issues.filter(i => i.severity === 'warning').length,
                  info_count: issues.filter(i => i.severity === 'info').length,
                },
              });

              if (issues.length === 0) {
                logger.info('No accessibility issues found.', {
                  component: 'accessibility',
                  target: url,
                });
                resolve();
                return;
              }

              // Log individual issues
              issues.forEach(issue => {
                logger.warn('Accessibility issue detected', {
                  component: 'accessibility',
                  target: url,
                  message: `${issue.severity.toUpperCase()}: ${issue.issue} in <${issue.element}>`,
                });
              });

              if (issues.some(i => i.severity === 'error')) {
                reject(new Error('Accessibility errors found'));
              } else {
                resolve();
              }
            });
          })
          .on('error', (error: Error) => {
            logger.error('Failed to fetch URL for accessibility check', {
              component: 'accessibility',
              error,
              target: url,
            });
            reject(error);
          });
      });
    }
  } catch (error) {
    logger.error('Accessibility check failed', {
      component: 'accessibility',
      error: error instanceof Error ? error : new Error('Unknown error'),
    });
    throw error;
  }
}

export { checkAccessibility };
