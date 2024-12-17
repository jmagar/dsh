export type EditorTheme = 'light' | 'dark' | 'system';

export type LanguageId = 
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'go'
  | 'rust'
  | 'java'
  | 'c'
  | 'cpp'
  | 'csharp'
  | 'php'
  | 'ruby'
  | 'html'
  | 'css'
  | 'json'
  | 'yaml'
  | 'markdown'
  | 'plaintext';

export interface EditorPosition {
  line: number;
  column: number;
}

export interface EditorRange {
  start: EditorPosition;
  end: EditorPosition;
}

export interface EditorSelection {
  anchor: EditorPosition;
  active: EditorPosition;
  isReversed?: boolean;
}

export interface EditorOptions {
  theme: EditorTheme;
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  wordWrapColumn: number;
  lineNumbers: 'on' | 'off' | 'relative';
  minimap: {
    enabled: boolean;
    side: 'right' | 'left';
    showSlider: 'always' | 'mouseover';
  };
  autoClosingBrackets: 'always' | 'beforeWhitespace' | 'never';
  autoClosingQuotes: 'always' | 'beforeWhitespace' | 'never';
  autoIndent: boolean;
  formatOnPaste: boolean;
  formatOnType: boolean;
  formatOnSave: boolean;
}

export interface EditorFile {
  id: string;
  path: string;
  name: string;
  content: string;
  language: LanguageId;
  modified: boolean;
  lastSaved?: string;
  readOnly?: boolean;
  encoding?: string;
  lineEndings?: 'crlf' | 'lf';
}

export interface EditorDiagnostic {
  range: EditorRange;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'hint';
  code?: string | number;
  source?: string;
  relatedInformation?: Array<{
    location: {
      file: string;
      range: EditorRange;
    };
    message: string;
  }>;
}

export interface CompletionItem {
  label: string;
  kind: CompletionItemKind;
  detail?: string;
  documentation?: string;
  sortText?: string;
  filterText?: string;
  insertText?: string;
  range?: EditorRange;
  command?: EditorCommand;
}

export type CompletionItemKind =
  | 'text'
  | 'method'
  | 'function'
  | 'constructor'
  | 'field'
  | 'variable'
  | 'class'
  | 'interface'
  | 'module'
  | 'property'
  | 'unit'
  | 'value'
  | 'enum'
  | 'keyword'
  | 'snippet'
  | 'color'
  | 'file'
  | 'reference'
  | 'folder'
  | 'enumMember'
  | 'constant'
  | 'struct'
  | 'event'
  | 'operator'
  | 'typeParameter';

export interface EditorCommand {
  id: string;
  title: string;
  tooltip?: string;
  arguments?: unknown[];
}

export interface EditorDecoration {
  range: EditorRange;
  options: {
    isWholeLine?: boolean;
    className?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderRadius?: string;
    cursor?: string;
    outline?: string;
    opacity?: string;
    color?: string;
    letterSpacing?: string;
    fontStyle?: string;
    fontWeight?: string;
    textDecoration?: string;
    before?: {
      contentText?: string;
      color?: string;
      backgroundColor?: string;
    };
    after?: {
      contentText?: string;
      color?: string;
      backgroundColor?: string;
    };
  };
}

export interface EditorState {
  files: EditorFile[];
  activeFile: string | null;
  selections: Record<string, EditorSelection[]>;
  diagnostics: Record<string, EditorDiagnostic[]>;
  decorations: Record<string, EditorDecoration[]>;
  options: EditorOptions;
  loading: boolean;
  error: string | null;
}

export interface EditorSearchOptions {
  query: string;
  caseSensitive?: boolean;
  wholeWord?: boolean;
  regex?: boolean;
  includeFiles?: string[];
  excludeFiles?: string[];
  maxResults?: number;
}

export interface EditorSearchResult {
  file: string;
  matches: Array<{
    range: EditorRange;
    text: string;
    lineText: string;
  }>;
}

export interface EditorDiff {
  range: EditorRange;
  text: string;
  rangeLength: number;
}

export interface EditorChangeEvent {
  file: string;
  changes: EditorDiff[];
  reason?: 'undo' | 'redo' | 'paste' | 'delete' | 'format';
}

// Type guards
export const isEditorPosition = (data: unknown): data is EditorPosition => {
  if (typeof data !== 'object' || data === null) return false;
  
  const pos = data as Partial<EditorPosition>;
  return (
    typeof pos.line === 'number' &&
    typeof pos.column === 'number'
  );
};

export const isEditorRange = (data: unknown): data is EditorRange => {
  if (typeof data !== 'object' || data === null) return false;
  
  const range = data as Partial<EditorRange>;
  return (
    range.start !== undefined &&
    range.end !== undefined &&
    isEditorPosition(range.start) &&
    isEditorPosition(range.end)
  );
};

export const isEditorFile = (data: unknown): data is EditorFile => {
  if (typeof data !== 'object' || data === null) return false;
  
  const file = data as Partial<EditorFile>;
  return (
    typeof file.id === 'string' &&
    typeof file.path === 'string' &&
    typeof file.name === 'string' &&
    typeof file.content === 'string' &&
    typeof file.language === 'string' &&
    typeof file.modified === 'boolean'
  );
}; 