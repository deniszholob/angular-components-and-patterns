import { wrapValue } from './number.util';

describe('number', () => {
  describe('wrapValue', () => {
    it('should test myUtilFunction', () => {
      expect(wrapValue).toBeDefined();
    });

    it('should calc', () => {
      expect(wrapValue(13, 64)).toBe(13);
      expect(wrapValue(-13, 64)).toBe(51);
    });
  });
});
