import { cleanAnsiText, cleanFileName } from '../util/helpers';

export const checkErrors = (result: JestResult, cwd: string): ReportError[] => {
  if (result.success) return [];
  const { testResults } = result;
  const failedResults = testResults.filter(r => r.status === 'failed');

  const errors: ReportError[] = [];
  failedResults.forEach(failedResult => {
    const { assertionResults } = failedResult;
    const failedAssertions = assertionResults.filter(ar => ar.status === 'failed');
    const fileName = cleanFileName(failedResult.name, cwd);

    failedAssertions.forEach(fa => {
      const test = [...fa.ancestorTitles, fa.title].join(' > ');
      const message = fa.failureMessages.map(msg => cleanFileName(cleanAnsiText(msg), cwd)).join(' ');
      errors.push({
        test,
        message,
        fileName,
      });
    });
  });

  return errors;
};
