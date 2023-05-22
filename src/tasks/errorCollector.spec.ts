import { checkErrors } from './errorCollector';
import { mockResult } from './mock';

describe('Error collector', () => {
  describe('given no errors in the report', () => {
    it('return empty array', () => {
      expect(checkErrors({ ...mockResult, success: true }, '')).toEqual([]);
    });
  });

  describe('given errors in the report', () => {
    let result: ReportError[] = [];
    beforeAll(() => {
      result = checkErrors(mockResult, '');
    });
    it('extract error from the report', () => {
      expect(result.length).toEqual(1);
    });

    it('format errors', () => {
      expect(result[0]).toMatchObject({
        test: expect.any(String),
        message: expect.any(String),
        fileName: expect.any(String),
      });
    });
  });
});
