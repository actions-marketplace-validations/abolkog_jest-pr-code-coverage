"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentReport = void 0;
const fs_1 = require("fs");
const github_1 = require("@actions/github");
const const_1 = require("../util/const");
const helpers_1 = require("../util/helpers");
const commentReport = async (report) => {
    const inputs = (0, helpers_1.getActionInputs)();
    const { payload, repo: repository } = github_1.context;
    if (!inputs.token || !payload.pull_request)
        return;
    const octokit = (0, github_1.getOctokit)(inputs.token);
    const comment = getComment(report);
    const { repo, owner } = repository;
    const comments = await octokit.rest.issues.listComments({
        issue_number: payload.pull_request.number,
        repo: repo,
        owner: owner,
    });
    const existingComment = comments.data.find(c => { var _a; return (_a = c.body) === null || _a === void 0 ? void 0 : _a.includes('<!-- @abolkog/pr-code-coverage-action -->'); });
    if (existingComment) {
        await octokit.rest.issues.updateComment({
            comment_id: existingComment.id,
            repo,
            owner,
            body: comment,
        });
    }
    else {
        await octokit.rest.issues.createComment({
            issue_number: payload.pull_request.number,
            owner,
            repo,
            body: comment,
        });
    }
};
exports.commentReport = commentReport;
const getComment = (report) => {
    const template = (0, fs_1.readFileSync)('src/comment_template.md').toString();
    return template
        .replace(const_1.commentVariable.title, 'PR Coverage Report')
        .replace(const_1.commentVariable.total, `${report.total}%`)
        .replace(const_1.commentVariable.summary, report.summary)
        .replace(const_1.commentVariable.details, report.details)
        .replace(const_1.commentVariable.failed, formatErrors(report));
};
const wrapCode = (code) => '```\n' + code + '\n```';
const formatErrors = (report) => {
    const { errors = [] } = report;
    if (!errors || errors.length === 0)
        return '';
    const template = (0, fs_1.readFileSync)('src/errors.md').toString();
    const erroMessages = errors.reduce((prev, cur) => `${prev}\n\n### ${cur.fileName}\n${wrapCode(cur.test)}\n${wrapCode(cur.message)}`, '');
    return template
        .replace(const_1.commentVariable.total, `${report.failedTests}/${report.totalTests}`)
        .replace(const_1.commentVariable.details, erroMessages);
};
