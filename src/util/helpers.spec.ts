import { cleanAnsiText, getActionInputs } from './helpers';

describe('helpers', () => {
  describe('getActionInputs', () => {
    it('return inputs value', () => {
      const inputs = getActionInputs();
      expect(inputs).toMatchObject({
        token: expect.any(String),
      });
    });
  });

  describe('cleanAnsiText', () => {
    it('remove ANSI code from text', () => {
      const text =
        'Error: \u001b[2mexpect(\u001b[22m\u001b[31mjest.fn()\u001b[39m\u001b[2m).\u001b[22mnot\u001b[2m.\u001b[22mtoBeCalled\u001b[2m()\u001b[22m';

      expect(cleanAnsiText(text)).toEqual('Error: expect(jest.fn()).not.toBeCalled()');
    });
  });
});
