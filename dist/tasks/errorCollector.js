"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrors = void 0;
const helpers_1 = require("../util/helpers");
const checkErrors = (result, cwd) => {
    if (result.success)
        return [];
    const { testResults } = result;
    const failedResults = testResults.filter(r => r.status === 'failed');
    const errors = [];
    failedResults.forEach(failedResult => {
        const { assertionResults } = failedResult;
        const failedAssertions = assertionResults.filter(ar => ar.status === 'failed');
        const fileName = (0, helpers_1.cleanFileName)(failedResult.name, cwd);
        failedAssertions.forEach(fa => {
            const test = [...fa.ancestorTitles, fa.title].join(' > ');
            const message = fa.failureMessages.map(msg => (0, helpers_1.cleanFileName)((0, helpers_1.cleanAnsiText)(msg), cwd)).join(' ');
            errors.push({
                test,
                message,
                fileName,
            });
        });
    });
    return errors;
};
exports.checkErrors = checkErrors;
