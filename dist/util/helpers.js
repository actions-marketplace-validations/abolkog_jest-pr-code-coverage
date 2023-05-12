"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanAnsiText = exports.cleanFileName = exports.capitaliseFirstLetter = exports.getActionInputs = void 0;
const core_1 = require("@actions/core");
const const_1 = require("./const");
const getActionInputs = () => {
    return {
        token: (0, core_1.getInput)(const_1.INPUTS.TOKEN),
    };
};
exports.getActionInputs = getActionInputs;
const capitaliseFirstLetter = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
exports.capitaliseFirstLetter = capitaliseFirstLetter;
const cleanFileName = (fileName, path) => fileName.replaceAll(`${path}/`, '');
exports.cleanFileName = cleanFileName;
const cleanAnsiText = (text) => text.replace(const_1.ANSI_REGX, '');
exports.cleanAnsiText = cleanAnsiText;
