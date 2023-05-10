import { exec } from '@actions/exec';
import { error } from '@actions/core';
import { existsSync, readFileSync } from 'fs';
import { generateReport } from './repotGenerator';

const summaryFile = 'coverage/coverage-summary.json';

export const runTest = async (files: string[]) => {
  const cwd = process.cwd();
  const filesStrings = files.join(' ');
  const testCommand = `npx jest --findRelatedTests ${filesStrings} --coverage --coverageReporters="json-summary"`;
  console.log(`Running test: ${testCommand}`);

  await exec(testCommand, [], { cwd });

  if (!existsSync(summaryFile)) {
    error(`Unable to find summary file ${summaryFile}`);
  }

  const data = readFileSync(summaryFile).toString();
  const report = generateReport(JSON.parse(data), cwd);

  console.log(report);
};
