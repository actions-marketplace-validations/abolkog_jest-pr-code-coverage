import { exec } from '@actions/exec';

export const runTest = async (files: string[]) => {
  const filesStrings = files.join(' ');
  const testCommand = `npx jest -- --coverage --coverageReporters="json-summary"`;
  console.log(`Running test: ${testCommand}`);

  //   const codeCoverage = execSync(testCommand).toString();

  //   const liscoveragePercentage = execSync('ls -altr').toString();

  //   console.log({ liscoveragePercentage, codeCoverage });

  await exec(testCommand, [], { cwd: process.cwd() });
  await exec('ls -altr', [], { cwd: process.cwd() });
  await exec('pwd', [], { cwd: process.cwd() });
};
