"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResult = exports.mockSummary = void 0;
exports.mockSummary = {
    total: {
        lines: { total: 23, covered: 5, skipped: 0, pct: 21.73 },
        statements: { total: 27, covered: 7, skipped: 0, pct: 25.92 },
        functions: { total: 6, covered: 1, skipped: 0, pct: 16.66 },
        branches: { total: 18, covered: 0, skipped: 0, pct: 0 },
        branchesTrue: { total: 0, covered: 0, skipped: 0, pct: 100 },
    },
    '/code/pr-code-coverage/src/index.ts': {
        lines: { total: 17, covered: 0, skipped: 0, pct: 0 },
        functions: { total: 4, covered: 0, skipped: 0, pct: 0 },
        statements: { total: 19, covered: 0, skipped: 0, pct: 0 },
        branches: { total: 18, covered: 0, skipped: 0, pct: 0 },
    },
    '/code/pr-code-coverage/src/util/helpers.ts': {
        lines: { total: 6, covered: 5, skipped: 0, pct: 83.33 },
        functions: { total: 2, covered: 1, skipped: 0, pct: 50 },
        statements: { total: 8, covered: 7, skipped: 0, pct: 87.5 },
        branches: { total: 0, covered: 0, skipped: 0, pct: 100 },
    },
};
exports.mockResult = {
    numFailedTests: 1,
    numTotalTests: 6,
    success: false,
    testResults: [
        {
            assertionResults: [
                {
                    ancestorTitles: ['helpers', 'getActionInputs'],
                    failureMessages: [],
                    status: 'passed',
                    title: 'return inputs value',
                },
            ],
            name: '/Users/khalid/code/open-source/pr-code-coverage/src/util/helpers.spec.ts',
            status: 'passed',
        },
        {
            assertionResults: [
                {
                    ancestorTitles: ['Report Generator'],
                    failureMessages: [],
                    status: 'passed',
                    title: 'calculate total coverage percentage',
                },
            ],
            name: '/Users/khalid/code/open-source/pr-code-coverage/src/tasks/reportGenerator.spec.ts',
            status: 'passed',
        },
        {
            assertionResults: [
                {
                    ancestorTitles: ['comment task', 'given a new comment'],
                    failureMessages: [
                        'Error: \u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).\u001b[22mnot\u001b[2m.\u001b[22mtoBeCalled\u001b[2m()\u001b[22m\n\nExpected number of calls: \u001b[32m0\u001b[39m\nReceived number of calls: \u001b[31m1\u001b[39m\n\n1: called with 0 arguments\n    at Object.<anonymous> (/Users/khalid/code/open-source/pr-code-coverage/src/tasks/comment.spec.ts:46:33)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)',
                    ],
                    status: 'failed',
                    title: 'create new comment',
                },
                {
                    ancestorTitles: ['comment task', 'given an existing comment'],
                    failureMessages: [],
                    status: 'passed',
                    title: 'update the comment',
                },
            ],
            name: '/Users/khalid/code/open-source/pr-code-coverage/src/tasks/comment.spec.ts',
            status: 'failed',
        },
    ],
    wasInterrupted: false,
};
