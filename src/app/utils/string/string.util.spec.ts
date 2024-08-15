import { stringToEnum, stripStartString } from './string.util';

describe('string-functions', () => {
  describe('stripStartString', () => {
    it('should strip the start of the original string if it starts with the remove string', () => {
      const original = 'prefix_hello';
      const remove = 'prefix_';
      expect(stripStartString(original, remove)).toBe('hello');
    });

    it('should return the original string if it does not start with the remove string', () => {
      const original = 'hello';
      const remove = 'prefix_';
      expect(stripStartString(original, remove)).toBe(original);
    });
  });

  describe('stringToEnum', () => {
    enum TestEnum {
      A = 'A',
      B = 'b',
      C = 0,
    }

    it('should convert a string to an enum if its valid', () => {
      expect(stringToEnum(TestEnum, 'A')).toBe(TestEnum.A);
      expect(stringToEnum(TestEnum, 'b')).toBe(TestEnum.B);
      expect(stringToEnum(TestEnum, 0)).toBe(TestEnum.C);
    });

    it('should return null if the string is not valid', () => {
      expect(stringToEnum(TestEnum, 'B')).toBeNull();
      expect(stringToEnum(TestEnum, 'a')).toBeNull();
      expect(stringToEnum(TestEnum, 'D')).toBeNull();
      expect(stringToEnum(TestEnum, 1)).toBeNull();
    });
  });
});
