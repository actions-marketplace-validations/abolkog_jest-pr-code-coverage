import { context, getOctokit } from '@actions/github';
import { error } from '@actions/core';
import { existsSync, readFileSync } from 'fs';

import { runTest } from './tasks/runTests';
import { generateReport } from './tasks/repotGenerator';

import { getActionInputs } from './util/helpers';
import { FILE_EXTENSIONS } from './util/const';
import { commentReport } from './tasks/comment';

const summaryFile = 'coverage/coverage-summary.json';

async function main() {
  const cwd = process.cwd();
  const filesToTest = await getChangedFiles();
  if (!filesToTest?.length) return;

  await runTest(filesToTest);

  if (!existsSync(summaryFile)) {
    error(`Unable to find summary file ${summaryFile}`);
  }

  const data = readFileSync(summaryFile).toString();
  const report = generateReport(JSON.parse(data), cwd);
  await commentReport(report);
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
  return files
    ?.map(file => file.filename)
    .filter(file => FILE_EXTENSIONS.includes(file.split('.')?.pop() || ''));
}

main();
