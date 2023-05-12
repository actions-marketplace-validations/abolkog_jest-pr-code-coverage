"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANSI_REGX = exports.FILE_EXTENSIONS = exports.commentVariable = exports.INPUTS = void 0;
exports.INPUTS = {
    TOKEN: 'github-token',
};
exports.commentVariable = {
    title: '{{title}}',
    total: '{{total}}',
    summary: '{{summary}}',
    details: '{{details}}',
    failed: '{{failed}}',
};
exports.FILE_EXTENSIONS = ['js', 'ts', 'jsx', 'tsx'];
exports.ANSI_REGX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
