"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("@actions/github");
const core_1 = require("@actions/core");
const fs_1 = require("fs");
const runTests_1 = require("./tasks/runTests");
const repotGenerator_1 = require("./tasks/repotGenerator");
const helpers_1 = require("./util/helpers");
const const_1 = require("./util/const");
const comment_1 = require("./tasks/comment");
const errorCollector_1 = require("./tasks/errorCollector");
const summaryFile = 'coverage/coverage-summary.json';
const reportFile = 'report.json';
async function main() {
    const cwd = process.cwd();
    const filesToTest = await getChangedFiles();
    if (!(filesToTest === null || filesToTest === void 0 ? void 0 : filesToTest.length))
        return;
    await (0, runTests_1.runTest)(filesToTest);
    if (!(0, fs_1.existsSync)(summaryFile)) {
        (0, core_1.error)(`Unable to find summary file ${summaryFile}`);
    }
    if (!(0, fs_1.existsSync)(reportFile)) {
        (0, core_1.error)(`Unable to find report file ${reportFile}`);
    }
    const result = JSON.parse((0, fs_1.readFileSync)(reportFile).toString());
    const data = JSON.parse((0, fs_1.readFileSync)(summaryFile).toString());
    const report = (0, repotGenerator_1.generateReport)(data, result, cwd);
    report.errors = (0, errorCollector_1.checkErrors)(result, cwd);
    await (0, comment_1.commentReport)(report);
    if (!report.success) {
        (0, core_1.setFailed)('Error in some of the tests');
    }
}
async function getChangedFiles() {
    const inputs = (0, helpers_1.getActionInputs)();
    const { payload, repo } = github_1.context;
    if (!inputs.token || !payload.pull_request)
        return;
    const octokit = (0, github_1.getOctokit)(inputs.token);
    const { data } = await octokit.rest.repos.compareCommits({
        owner: repo.owner,
        repo: repo.repo,
        head: payload.pull_request.head.sha,
        base: payload.pull_request.base.sha,
        per_page: 100,
    });
    const { files } = data;
    return files === null || files === void 0 ? void 0 : files.map(file => file.filename).filter(file => { var _a; return const_1.FILE_EXTENSIONS.includes(((_a = file.split('.')) === null || _a === void 0 ? void 0 : _a.pop()) || ''); });
}
main();
