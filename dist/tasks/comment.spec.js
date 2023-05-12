"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mock_1 = require("./mock");
const repotGenerator_1 = require("./repotGenerator");
const helpers = __importStar(require("../util/helpers"));
const comment_1 = require("./comment");
const listComments = jest.fn();
const updateComment = jest.fn();
const createComment = jest.fn();
jest.spyOn(helpers, 'getActionInputs').mockReturnValue({ token: 'token' });
jest.mock('@actions/github', () => ({
    context: {
        repo: {},
        payload: {
            pull_request: {
                number: 1,
            },
        },
    },
    getOctokit: jest.fn().mockReturnValue({
        rest: {
            issues: {
                listComments: () => listComments(),
                updateComment: () => updateComment(),
                createComment: () => createComment(),
            },
        },
    }),
}));
describe('comment task', () => {
    const cwd = '/code/pr-code-coverage';
    const report = (0, repotGenerator_1.generateReport)(mock_1.mockSummary, mock_1.mockResult, cwd);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('given a new comment', () => {
        beforeEach(() => listComments.mockReturnValueOnce({ data: [] }));
        it('create new comment', async () => {
            await (0, comment_1.commentReport)(report);
            expect(listComments).toBeCalled();
            expect(updateComment).not.toBeCalled();
            expect(createComment).toBeCalled();
        });
    });
    describe('given an existing comment', () => {
        beforeEach(() => listComments.mockReturnValueOnce({
            data: [
                {
                    id: 1,
                    body: 'a comment',
                },
                {
                    id: 2,
                    body: 'pr coverage <!-- @abolkog/pr-code-coverage-action -->',
                },
            ],
        }));
        it('update the comment', async () => {
            await (0, comment_1.commentReport)(report);
            expect(listComments).toBeCalled();
            expect(updateComment).toBeCalled();
            expect(createComment).not.toBeCalled();
        });
    });
});
