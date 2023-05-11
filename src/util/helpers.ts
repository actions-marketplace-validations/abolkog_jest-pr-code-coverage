import { getInput } from '@actions/core';
import { ANSI_REGX, INPUTS } from './const';

export const getActionInputs = (): ActionInputs => {
  return {
    token: getInput(INPUTS.TOKEN),
  };
};

export const capitaliseFirstLetter = (word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

export const cleanFileName = (fileName: string, path: string) => fileName.replaceAll(`${path}/`, '');

export const cleanAnsiText = (text: string) => text.replace(ANSI_REGX, '');
