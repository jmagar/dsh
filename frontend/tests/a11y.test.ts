import type { A11yCheck } from '../src/utils/a11y';
import { checkAccessibility } from '../src/utils/a11y';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveLength(length: number): R;
      toEqual(expected: unknown): R;
    }
  }
}

describe('checkAccessibility', () => {
  it('should detect missing alt text on images', () => {
    const html = `
      <div>
        <img src="test.jpg">
        <img src="test2.jpg" alt="">
        <img src="test3.jpg" alt="valid alt">
      </div>
    `;

    const issues = checkAccessibility(html);
    const imgIssues = issues.filter(i => i.element === 'img');

    expect(imgIssues).toHaveLength(2);
    expect(imgIssues[0]).toEqual<A11yCheck>({
      element: 'img',
      issue: 'Missing alt text',
      severity: 'error',
    });
  });

  it('should detect inputs without labels', () => {
    const html = `
      <div>
        <input type="text" id="test1">
        <input type="text" id="test2">
        <label for="test2">Valid Label</label>
      </div>
    `;

    const issues = checkAccessibility(html);
    const inputIssues = issues.filter(i => i.element === 'input');

    expect(inputIssues).toHaveLength(1);
    expect(inputIssues[0]).toEqual<A11yCheck>({
      element: 'input',
      issue: 'Input missing associated label',
      severity: 'error',
    });
  });

  it('should detect skipped heading levels', () => {
    const html = `
      <div>
        <h1>Title</h1>
        <h3>Subtitle</h3>
      </div>
    `;

    const issues = checkAccessibility(html);
    const headingIssues = issues.filter(i => i.element === 'h3');

    expect(headingIssues).toHaveLength(1);
    expect(headingIssues[0]).toEqual<A11yCheck>({
      element: 'h3',
      issue: 'Skipped heading level',
      severity: 'warning',
    });
  });

  it('should detect non-button elements with button role', () => {
    const html = `
      <div>
        <div role="button">Click me</div>
        <button>Valid Button</button>
      </div>
    `;

    const issues = checkAccessibility(html);
    const buttonIssues = issues.filter(i => i.issue.includes('button role'));

    expect(buttonIssues).toHaveLength(1);
    expect(buttonIssues[0]).toEqual<A11yCheck>({
      element: 'div',
      issue: 'Non-button element with button role should be a <button>',
      severity: 'warning',
    });
  });

  it('should return no issues for valid HTML', () => {
    const html = `
      <div>
        <img src="test.jpg" alt="valid alt">
        <input type="text" id="test">
        <label for="test">Valid Label</label>
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <button>Valid Button</button>
      </div>
    `;

    const issues = checkAccessibility(html);
    expect(issues).toHaveLength(0);
  });
});
