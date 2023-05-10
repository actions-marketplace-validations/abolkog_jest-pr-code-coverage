interface ActionInputs {
  token: string;
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

interface Report {
  total: string;
  summary: string;
  details: string;
}
