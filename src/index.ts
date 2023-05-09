import { context, getOctokit } from '@actions/github';
import { getActionInputs } from './util/helpers';
import { runTest } from './tasks/runTests';

async function main() {
  const filesToTest = await getChangedFiles();
  if (!filesToTest?.length) return;
  runTest(filesToTest);
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
  return files?.map(file => file.filename);
}

main();
