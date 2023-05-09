import { getInput } from '@actions/core';
import { INPUTS } from './const';

export const getActionInputs = (): ActionInputs => {
  return {
    token: getInput(INPUTS.TOKEN),
    testCmd: getInput(INPUTS.TEST_CMD),
  };
};
