"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = void 0;
const markdown_table_1 = __importDefault(require("markdown-table"));
const helpers_1 = require("../util/helpers");
/**
 * Generate report
 * @param report The coverage summary json report
 * @param cwd current working directory. Used to format file name
 * @returns report
 */
const generateReport = (report, result, cwd) => {
    const { total } = report;
    delete total.branchesTrue;
    const totalCoverage = getOverallPercentage(report);
    const summary = genSummary(report);
    const details = genDetails(report, cwd);
    return {
        failedTests: result.numFailedTests,
        totalTests: result.numTotalTests,
        success: result.success,
        total: totalCoverage,
        summary,
        details,
    };
};
exports.generateReport = generateReport;
/**
 * Caclulate total percentage
 * @param report The coverage summary json report
 * @returns total percentage
 */
const getOverallPercentage = (report) => {
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
const genSummary = (report) => {
    const { total } = report;
    const summary = Object.entries(total).map(([key, value]) => [
        (0, helpers_1.capitaliseFirstLetter)(key),
        `${value.pct}%`,
        `${value.covered}/${value.total}`,
    ]);
    return (0, markdown_table_1.default)([['Category', 'Percentage', 'Covered/Total'], ...summary]);
};
/**
 * Generate files coverage details table
 * @param report The coverage summary json report
 * @param cwd current working directory. Used to format file name
 * @returns Markdown table for coverage details
 */
const genDetails = (report, cwd) => {
    const details = Object.entries(report)
        .filter(([key]) => key !== 'total')
        .map(([fileName, value]) => [
        (0, helpers_1.cleanFileName)(fileName, cwd),
        `${value.lines.pct}%`,
        `${value.statements.pct}%`,
        `${value.branches.pct}%`,
        `${value.functions.pct}%`,
    ]);
    return (0, markdown_table_1.default)([['File', 'Lines', 'Statements', 'Branches', 'Functions'], ...details]);
};
