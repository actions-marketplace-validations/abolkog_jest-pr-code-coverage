import { info } from '@actions/core';
import { exec } from '@actions/exec';

export const runTest = async (testScrip: string, files: string[]) => {
  const filesStrings = files.join(' ');

  const testCMD = testScrip || 'npx jest';
  const extraDash = testCMD === 'npx jest' ? '' : '--';

  const testCommand = [
    testCMD,
    extraDash,
    `--findRelatedTests ${filesStrings}`,
    `--collectCoverageFrom ${filesStrings}`,
    '--ci',
    '--json',
    '--coverage',
    '--coverageReporters="json-summary"',
    '--outputFile="report.json"',
  ].join(' ');

  info(`Running test: ${testCommand}`);

  await exec(testCommand, [], { cwd: process.cwd(), failOnStdErr: false, ignoreReturnCode: true });
};
