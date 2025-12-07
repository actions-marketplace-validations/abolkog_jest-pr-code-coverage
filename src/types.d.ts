interface ActionInputs {
  token: string;
  testScript: string;
  minThreshold?: number;
}

interface CoverageValues {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
}

interface CoverageItem {
  [x: string]: CoverageValues;
  lines: CoverageValues;
  statements: CoverageValues;
  functions: CoverageValues;
  branches: CoverageValues;
}

interface CoverageReport extends Record<string, CoverageItem> {
  total: CoverageItem;
}

interface ReportError {
  test: string;
  message: string;
  fileName: string;
}

interface Report {
  total: number;
  summary: string;
  details: string;
  totalTests: number;
  failedTests: number;
  success: boolean;
  reasonMessage?: string;
  errors?: ReportError[];
}

type Status = 'passed' | 'failed';

interface AssertionResult {
  ancestorTitles: string[];
  failureMessages: string[];
  status: Status;
  title: string;
}

interface TestResult {
  assertionResults: AssertionResult[];
  name: string;
  status: Status;
}

interface JestResult {
  numFailedTests: number;
  numTotalTests: number;
  success: boolean;
  testResults: TestResult[];
  wasInterrupted: boolean;
}
