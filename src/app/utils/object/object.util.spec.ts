import {
  extractObjectValue,
  isObject,
  isObjectEmpty,
  setObjectValue,
  typedNullCheck,
} from './object.util';

describe('object-functions', () => {
  describe('typedNullCheck', () => {
    it('typedNullCheck with strings', () => {
      const arA: string[] = ['a'];
      const arB: (null | undefined)[] = [null, undefined];
      const arC: (string | null | undefined)[] = [...arA, ...arB];

      // Compiler should check that the types match even before runtime errors can occur.
      const arAf: string[] = arA.filter(typedNullCheck);
      const arBf: string[] = arB.filter(typedNullCheck);
      const arCf: string[] = arC.filter(typedNullCheck);

      expect(arAf).toStrictEqual(arA);
      expect(arBf).toStrictEqual([]);
      expect(arCf).toStrictEqual(arA);
    });

    it('typedNullCheck with numbers', () => {
      const arA: number[] = [0];
      const arB: (null | undefined)[] = [null, undefined];
      const arC: (number | null | undefined)[] = [...arA, ...arB];

      // Compiler should check that the types match even before runtime errors can occur.
      const arAf: number[] = arA.filter(typedNullCheck);
      const arBf: number[] = arB.filter(typedNullCheck);
      const arCf: number[] = arC.filter(typedNullCheck);

      expect(arAf).toStrictEqual(arA);
      expect(arBf).toStrictEqual([]);
      expect(arCf).toStrictEqual(arA);
    });
  });

  describe('isObject', () => {
    expect(isObject({})).toStrictEqual(true);
    expect(isObject([])).toStrictEqual(false);
    expect(isObject('')).toStrictEqual(false);
    expect(isObject(0)).toStrictEqual(false);
    expect(isObject(1)).toStrictEqual(false);
    expect(isObject(null)).toStrictEqual(false);
    expect(isObject(undefined)).toStrictEqual(false);

    expect(isObject(' ')).toStrictEqual(false);
    expect(isObject([''])).toStrictEqual(false);
    expect(isObject({ '': '' })).toStrictEqual(true);
  });

  describe('isObjectEmpty', () => {
    expect(isObjectEmpty(undefined)).toBe(true);
    expect(isObjectEmpty(null)).toBe(true);
    expect(isObjectEmpty({})).toBe(true);
    expect(isObjectEmpty('')).toBe(true);
    expect(isObjectEmpty([])).toBe(true);
    expect(isObjectEmpty(0)).toBe(true);
    expect(isObjectEmpty(1)).toBe(true);
    expect(isObjectEmpty(11)).toBe(true);

    expect(isObjectEmpty(' ')).toBe(false);
    expect(isObjectEmpty([''])).toBe(false);
    expect(isObjectEmpty({ '': '' })).toBe(false);
  });

  describe('extractObjectValue', () => {
    let spyConsoleWarn: jest.SpyInstance;

    beforeEach(() => {
      spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      spyConsoleWarn.mockRestore();
    });

    it('returns object when empty path string is provided', () => {
      const obj: { a: string } = { a: 'value' };
      expect(extractObjectValue(obj, '')).toStrictEqual(obj);
    });

    it('extracts string value', () => {
      const obj: { a: string } = { a: 'value' };
      expect(extractObjectValue(obj, 'a')).toStrictEqual('value');
    });

    it('extracts number value', () => {
      const obj: { a: number } = { a: 123 };
      expect(extractObjectValue(obj, 'a')).toStrictEqual(123);
    });

    it('extracts boolean true value', () => {
      const obj: { a: boolean } = { a: true };
      expect(extractObjectValue(obj, 'a')).toStrictEqual(true);
    });
    it('extracts boolean false value', () => {
      const obj: { a: boolean } = { a: false };
      expect(extractObjectValue(obj, 'a')).toStrictEqual(false);
    });

    it('extracts object value', () => {
      const obj: { a: { b: string } } = { a: { b: 'value' } };
      expect(extractObjectValue(obj, 'a')).toStrictEqual({ b: 'value' });
    });
    it('extracts nested object value', () => {
      const obj: { a: { b: string } } = { a: { b: 'value' } };
      expect(extractObjectValue(obj, 'a/b')).toStrictEqual('value');
    });
    // #region warnings
    it('gives warning when optional field is not provided', () => {
      const obj: { a?: string } = {};
      expect(extractObjectValue(obj, 'a')).toStrictEqual(undefined);
      expect(spyConsoleWarn).toHaveBeenCalledWith(
        'Field with keyPath obj[a] does not exist in object',
      );
    });

    // TODO: finish test cases
    // #endregion

    // #region arrays

    it('extracts array value', () => {
      const obj: { a: string[] } = { a: ['value1', 'value2'] };
      expect(extractObjectValue(obj, 'a')).toStrictEqual(['value1', 'value2']);
    });

    it('extracts array item value', () => {
      const obj: { a: string[] } = { a: ['value1', 'value2'] };
      expect(extractObjectValue(obj, 'a/0')).toStrictEqual('value1');
    });

    // TODO: finish test cases
    // #endregion

    // TODO: finish test cases
  });

  describe('setObjectValue', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let object: any | undefined = undefined;

    beforeEach(() => {
      object = {
        name: 'John',
        address: { apt: '123', city: 'San Diego' },
        friends: [{ name: 'Jane' }, { name: 'Joe' }],
      };
    });

    it('clears a top-level field', () => {
      setObjectValue(object, 'name', undefined);
      expect(object.name).toStrictEqual(undefined);
    });

    it('clears a nested field', () => {
      setObjectValue(object, 'address/apt', undefined);
      expect(object.address.apt).toStrictEqual(undefined);
    });

    it('sets a new nested field', () => {
      setObjectValue(object, 'address/country', 'USA');
      expect(object.address.country).toStrictEqual('USA');
    });

    it('clears an array field', () => {
      setObjectValue(object, 'friends', undefined);
      expect(object.friends).toStrictEqual(undefined);
    });

    it("clears a specific array element's field", () => {
      setObjectValue(object, 'friends/0/name', undefined);
      expect(object.friends[0].name).toStrictEqual(undefined);
    });

    it('updates multiple array elements with wildcard', () => {
      setObjectValue(object, 'friends/{i}/name', 'Anonymous');
      expect(object.friends).toStrictEqual([
        { name: 'Anonymous' },
        { name: 'Anonymous' },
      ]);
    });

    it('clears a specific array element', () => {
      setObjectValue(object, 'friends/0', undefined);
      expect(object.friends[0]).toStrictEqual(undefined);
      expect(object.friends[1]).toStrictEqual({ name: 'Joe' });
    });

    it('clears all elements in an array using wildcard', () => {
      setObjectValue(object, 'friends/{i}', undefined);
      expect(object.friends).toStrictEqual([undefined, undefined]);
    });
  });
});
