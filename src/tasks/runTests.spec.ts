import { runTest } from './runTests';
import * as ExCore from '@actions/exec';

jest.mock('@actions/core');
const execSpy = jest.spyOn(ExCore, 'exec');

describe('Run tests', () => {
  const files = ['a.js', 'b.js'];
  beforeEach(() => {
    execSpy.mockImplementation(() => Promise.resolve(0));
  });

  describe('test flags', () => {
    beforeEach(async () => {
      execSpy.mockClear();
      await runTest('', files);
    });

    it('uses the --coverage, --ci and --json flags', () => {
      expect(execSpy.mock.calls[0][0]).toMatch(new RegExp('--ci --json --coverage'));
    });

    it('uses the --outputFile flag', () => {
      expect(execSpy.mock.calls[0][0]).toMatch(new RegExp('--outputFile="report.json"'));
    });

    it('uses the --coverageReporters flag', () => {
      expect(execSpy.mock.calls[0][0]).toMatch(new RegExp('--coverageReporters="json-summary"'));
    });

    it('uses the --findRelatedTests flag', () => {
      expect(execSpy.mock.calls[0][0]).toMatch(new RegExp(`--findRelatedTests ${files.join(' ')}`));
    });
  });

  describe('given no custom test script', () => {
    beforeEach(async () => {
      execSpy.mockClear();
      await runTest('', files);
    });

    it('uses default test script', () => {
      expect(execSpy.mock.calls[0][0]).toMatch(new RegExp('npx jest'));
    });
  });

  describe('given a custom test script', () => {
    const script = 'npm test';
    beforeEach(async () => {
      execSpy.mockClear();
      await runTest(script, files);
    });

    it('uses the custom test script', () => {
      expect(execSpy.mock.calls[0][0]).toMatch(new RegExp(script));
    });

    it('add dashes to the test script', () => {
      expect(execSpy.mock.calls[0][0]).toMatch(new RegExp(`${script} -- `));
    });
  });
});
