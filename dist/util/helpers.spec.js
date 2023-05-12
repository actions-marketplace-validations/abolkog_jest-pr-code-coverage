"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
describe('helpers', () => {
    describe('getActionInputs', () => {
        it('return inputs value', () => {
            const inputs = (0, helpers_1.getActionInputs)();
            expect(inputs).toMatchObject({
                token: expect.any(String),
            });
        });
    });
});
