import { mockResult, mockSummary } from './mock';
import { generateReport } from './repotGenerator';

describe('Report Generator', () => {
  const cwd = '/code/pr-code-coverage';
  let report: Report;

  beforeAll(() => {
    report = generateReport(mockSummary, mockResult, cwd);
  });

  it('calculate total coverage percentage', () => {
    expect(report.total).toEqual(16.0775);
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

  describe('given a min threshold specified', () => {
    const minThreshold = 45;
    beforeAll(() => {
      report = generateReport(mockSummary, mockResult, cwd, minThreshold);
    });
    it('set success to false', () => {
      expect(report.success).toEqual(false);
    });

    it('set reason message', () => {
      expect(report.reasonMessage).toEqual(`Total coverage is less than the specified threshol of ${minThreshold}%`);
    });
  });
});
