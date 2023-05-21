import { context, getOctokit } from '@actions/github';
import { setFailed } from '@actions/core';
import { existsSync, readFileSync } from 'fs';

import { runTest } from './tasks/runTests';
import { generateReport } from './tasks/repotGenerator';

import { getActionInputs } from './util/helpers';
import { FILE_EXTENSIONS } from './util/const';
import { commentReport } from './tasks/comment';
import { checkErrors } from './tasks/errorCollector';

const summaryFile = 'coverage/coverage-summary.json';
const reportFile = 'report.json';

const main = async () => {
  const cwd = process.cwd();
  const inputs = getActionInputs();
  if (!inputs.token) return;

  const filesToTest = await getChangedFiles(inputs.token);
  if (!filesToTest?.length) return;

  await runTest(inputs.testScript, filesToTest);

  if (!existsSync(summaryFile) || !existsSync(reportFile)) {
    reportNoResult();
    return;
  }

  const result = JSON.parse(readFileSync(reportFile).toString());

  const data = JSON.parse(readFileSync(summaryFile).toString());

  const report = generateReport(data, result, cwd);
  report.errors = checkErrors(result, cwd);

  await commentReport(report);

  if (!report.success) {
    setFailed('Error in some of the tests');
  }
};

const reportNoResult = async () => {
  const report: Report = {
    success: true,
    total: 0,
    totalTests: 0,
    failedTests: 0,
    summary: 'No tests found!',
    details: '',
  };
  await commentReport(report);
};

const getChangedFiles = async (token: string) => {
  const { payload, repo } = context;
  if (!payload.pull_request) return;

  const octokit = getOctokit(token);
  const { data } = await octokit.rest.repos.compareCommits({
    owner: repo.owner,
    repo: repo.repo,
    head: payload.pull_request.head.sha,
    base: payload.pull_request.base.sha,
    per_page: 100,
  });

  const { files } = data;
  return files?.map(file => file.filename).filter(file => FILE_EXTENSIONS.includes(file.split('.')?.pop() || ''));
};

main();
