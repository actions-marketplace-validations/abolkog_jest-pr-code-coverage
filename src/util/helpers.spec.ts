import { getActionInputs } from './helpers';

describe('helpers', () => {
  describe('getActionInputs', () => {
    it('return inputs value', () => {
      const inputs = getActionInputs();
      expect(inputs).toMatchObject({
        token: expect.any(String),
      });
    });
  });
});
