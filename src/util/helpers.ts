import { getInput } from '@actions/core';
import { INPUTS } from './const';

export const getActionInputs = (): ActionInputs => {
  return {
    token: getInput(INPUTS.TOKEN),
  };
};

export const capitaliseFirstLetter = (word: string) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
