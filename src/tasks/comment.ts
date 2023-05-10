import { readFileSync } from 'fs';
import { context, getOctokit } from '@actions/github';

import { commentVariable } from '../util/const';
import { getActionInputs } from '../util/helpers';

export const commentReport = async (report: Report) => {
  const inputs = getActionInputs();
  const { payload, repo: repository } = context;

  if (!inputs.token || !payload.pull_request) return;

  const octokit = getOctokit(inputs.token);

  const comment = getComment(report);

  const { repo, owner } = repository;

  const comments = await octokit.rest.issues.listComments({
    issue_number: payload.pull_request.number,
    repo: repo,
    owner: owner,
  });

  const existingComment = comments.data.find(c =>
    c.body?.includes('<!-- @abolkog/pr-code-coverage-action -->')
  );

  if (existingComment) {
    await octokit.rest.issues.updateComment({
      comment_id: existingComment.id,
      repo,
      owner,
      body: comment,
    });
  } else {
    await octokit.rest.issues.createComment({
      issue_number: payload.pull_request.number,
      owner,
      repo,
      body: comment,
    });
  }
};

const getComment = (report: Report) => {
  const template = readFileSync('src/comment_template.md').toString();
  return template
    .replace(commentVariable.title, 'PR Coverage Report')
    .replace(commentVariable.total, `${report.total}%`)
    .replace(commentVariable.summary, report.summary)
    .replace(commentVariable.details, report.details);
};
