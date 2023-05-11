import { context, getOctokit } from '@actions/github';
import { error, setFailed } from '@actions/core';
import { existsSync, readFileSync } from 'fs';

import { runTest } from './tasks/runTests';
import { generateReport } from './tasks/repotGenerator';

import { getActionInputs } from './util/helpers';
import { FILE_EXTENSIONS } from './util/const';
import { commentReport } from './tasks/comment';
import { checkErrors } from './tasks/errorCollector';

const summaryFile = 'coverage/coverage-summary.json';
const reportFile = 'report.json';

async function main() {
  const cwd = process.cwd();
  const filesToTest = await getChangedFiles();
  if (!filesToTest?.length) return;

  await runTest(filesToTest);

  if (!existsSync(summaryFile)) {
    error(`Unable to find summary file ${summaryFile}`);
  }
  if (!existsSync(reportFile)) {
    error(`Unable to find report file ${reportFile}`);
  }

  const result = JSON.parse(readFileSync(reportFile).toString());

  const data = JSON.parse(readFileSync(summaryFile).toString());

  const report = generateReport(data, result, cwd);
  report.errors = checkErrors(result, cwd);

  await commentReport(report);

  if (!report.success) {
    setFailed('Error in some of the tests');
  }
}

async function getChangedFiles() {
  const inputs = getActionInputs();
  const { payload, repo } = context;
  if (!inputs.token || !payload.pull_request) return;

  const octokit = getOctokit(inputs.token);
  const { data } = await octokit.rest.repos.compareCommits({
    owner: repo.owner,
    repo: repo.repo,
    head: payload.pull_request.head.sha,
    base: payload.pull_request.base.sha,
    per_page: 100,
  });

  const { files } = data;
  return files?.map(file => file.filename).filter(file => FILE_EXTENSIONS.includes(file.split('.')?.pop() || ''));
}

main();
