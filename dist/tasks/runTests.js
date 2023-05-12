"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTest = void 0;
const exec_1 = require("@actions/exec");
const runTest = async (files) => {
    const filesStrings = files.join(' ');
    const testCommand = [
        'npx',
        'jest',
        `--findRelatedTests ${filesStrings}`,
        '--ci',
        '--json',
        '--coverage',
        '--coverageReporters="json-summary"',
        '--outputFile="report.json"',
    ].join(' ');
    console.log(`Running test: ${testCommand}`);
    await (0, exec_1.exec)(testCommand, [], { cwd: process.cwd(), failOnStdErr: false, ignoreReturnCode: true });
};
exports.runTest = runTest;
