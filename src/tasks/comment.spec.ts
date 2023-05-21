import { mockResult, mockSummary } from './mock';
import { generateReport } from './repotGenerator';
import * as helpers from '../util/helpers';
import { commentReport } from './comment';

const listComments = jest.fn();
const updateComment = jest.fn();
const createComment = jest.fn();

jest.spyOn(helpers, 'getActionInputs').mockReturnValue({ token: 'token', testScript: 'npx jest' });

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
  const report = generateReport(mockSummary, mockResult, cwd);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('given a new comment', () => {
    beforeEach(() => listComments.mockReturnValueOnce({ data: [] }));
    it('create new comment', async () => {
      await commentReport(report);
      expect(listComments).toBeCalled();
      expect(updateComment).not.toBeCalled();
      expect(createComment).toBeCalled();
    });
  });

  describe('given an existing comment', () => {
    beforeEach(() =>
      listComments.mockReturnValueOnce({
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
      }),
    );
    it('update the comment', async () => {
      await commentReport(report);
      expect(listComments).toBeCalled();
      expect(updateComment).toBeCalled();
      expect(createComment).not.toBeCalled();
    });
  });
});
