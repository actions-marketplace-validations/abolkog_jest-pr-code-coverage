"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_1 = require("./mock");
const repotGenerator_1 = require("./repotGenerator");
describe('Report Generator', () => {
    const cwd = '/code/pr-code-coverage';
    let report;
    beforeAll(() => {
        report = (0, repotGenerator_1.generateReport)(mock_1.mockSummary, mock_1.mockResult, cwd);
    });
    it('calculate total coverage percentage', () => {
        expect(report.total).toEqual('16.08');
    });
    it('generate summary table', () => {
        expect(report.summary).toMatchInlineSnapshot(`
"| Category   | Percentage | Covered/Total |
| ---------- | ---------- | ------------- |
| Lines      | 21.73%     | 5/23          |
| Statements | 25.92%     | 7/27          |
| Functions  | 16.66%     | 1/6           |
| Branches   | 0%         | 0/18          |"
`);
    });
    it('generate details table', () => {
        expect(report.details).toMatchInlineSnapshot(`
"| File                | Lines  | Statements | Branches | Functions |
| ------------------- | ------ | ---------- | -------- | --------- |
| src/index.ts        | 0%     | 0%         | 0%       | 0%        |
| src/util/helpers.ts | 83.33% | 87.5%      | 100%     | 50%       |"
`);
    });
});
