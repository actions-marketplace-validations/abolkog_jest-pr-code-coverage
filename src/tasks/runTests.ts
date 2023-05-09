import { exec } from '@actions/exec';

export const runTest = async (files: string[]) => {
  const filesStrings = files.join(' ');
  const testCommand = `npx jest --findRelatedTests ${filesStrings} --coverage --coverageReporters="json-summary"`;
  console.log(`Running test: ${testCommand}`);

  await exec(testCommand, [], { cwd: process.cwd() });
};
