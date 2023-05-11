import { exec } from '@actions/exec';

export const runTest = async (files: string[]) => {
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

  await exec(testCommand, [], { cwd: process.cwd(), failOnStdErr: false, ignoreReturnCode: true });
};
