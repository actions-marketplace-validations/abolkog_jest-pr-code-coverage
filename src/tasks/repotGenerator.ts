import markdownTable from 'markdown-table';
import { capitaliseFirstLetter } from '../util/helpers';

/**
 * Generate report
 * @param report The coverage summary json report
 * @param cwd current working directory. Used to format file name
 * @returns report
 */
export const generateReport = (report: CoverageReport, cwd: string): Report => {
  const { total } = report;
  delete total.branchesTrue;

  const totalCoverage = getOverallPercentage(report);
  const summary = genSummary(report);
  const details = genDetails(report, cwd);

  return {
    total: totalCoverage,
    summary,
    details,
  };
};

/**
 * Caclulate total percentage
 * @param report The coverage summary json report
 * @returns total percentage
 */
const getOverallPercentage = (report: CoverageReport) => {
  const { total } = report;
  delete total.branchesTrue;

  const sum = Object.values(total)
    .map(val => val.pct)
    .reduce((sum, nxt) => sum + nxt, 0);

  return (sum / 4).toFixed(2);
};

/**
 * Generate summary table
 * @param report The coverage summary json report
 * @returnsMarkdown table for summary table
 */
const genSummary = (report: CoverageReport) => {
  const { total } = report;

  const summary = Object.entries(total).map(([key, value]) => [
    capitaliseFirstLetter(key),
    `${value.pct}%`,
    `${value.covered}/${value.total}`,
  ]);

  return markdownTable([
    ['Category', 'Percentage', 'Covered/Total'],
    ...summary,
  ]);
};

/**
 * Generate files coverage details table
 * @param report The coverage summary json report
 * @param cwd current working directory. Used to format file name
 * @returns Markdown table for coverage details
 */
const genDetails = (report: CoverageReport, cwd: string) => {
  const details = Object.entries(report)
    .filter(([key]) => key !== 'total')
    .map(([fileName, value]) => [
      normaliseFileName(fileName, cwd),
      `${value.lines.pct}%`,
      `${value.statements.pct}%`,
      `${value.branches.pct}%`,
      `${value.functions.pct}%`,
    ]);

  return markdownTable([
    ['File', 'Lines', 'Statements', 'Branches', 'Functions'],
    ...details,
  ]);
};

/**
 * helper to return file name without the full path
 * @param fileName file name
 * @param path path
 * @returns
 */
const normaliseFileName = (fileName: string, path: string) =>
  fileName.replace(path, '');
