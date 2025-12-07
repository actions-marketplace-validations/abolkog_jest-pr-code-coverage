import { context, getOctokit } from '@actions/github';

import { commentVariable, COMMENTS_TEMPLATE, commentTag } from '../util/const';
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

  const existingComment = comments.data.find(c => c.body?.includes(commentTag));

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
  const template = COMMENTS_TEMPLATE.base;
  return template
    .replace(commentVariable.title, 'PR Coverage Report')
    .replace(commentVariable.total, `${formatTotal(report.total)}`)
    .replace(commentVariable.threshold, `${formatThreshold(report)}`)
    .replace(commentVariable.summary, report.summary)
    .replace(commentVariable.coverage, formatCoverage(report))
    .replace(commentVariable.failed, formatErrors(report));
};

const wrapCode = (code: string) => '```\n' + code + '\n```';

const formatCoverage = (report: Report) => {
  if (!report.details) return '';
  const template = COMMENTS_TEMPLATE.coverage;
  return template.replace(commentVariable.details, report.details);
};

const formatErrors = (report: Report) => {
  const { errors = [] } = report;
  if (!errors || errors.length === 0) return '';
  const template = COMMENTS_TEMPLATE.error;

  const erroMessages = errors.reduce(
    (prev, cur) => `${prev}\n\n### ${cur.fileName}\n${wrapCode(cur.test)}\n${wrapCode(cur.message)}`,
    '',
  );

  return template
    .replace(commentVariable.total, `${report.failedTests}/${report.totalTests}`)
    .replace(commentVariable.details, erroMessages);
};

const formatTotal = (total: number) => {
  const icon = coverageToIcon(total);
  return `${total.toFixed(2)}% ${icon}`;
};

const formatThreshold = (report: Report) => {
  if (!report.reasonMessage) return '';

  return `:x: ${report.reasonMessage}`;
};

const coverageToIcon = (total: number) => {
  if (total > 80) return ':green_circle:';
  if (total > 50) return ':orange_circle:';
  return ':red_circle:';
};
