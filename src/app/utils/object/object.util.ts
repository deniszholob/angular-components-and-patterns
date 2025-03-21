// Object utilities

/**
 * @usage .filter(typedNullCheck)
 * @returns true if obj is not null or undefined
 */
export function typedNullCheck<T>(obj: T): obj is NonNullable<T> {
  return obj != null;
}

export function isObject<T>(obj: T): boolean {
  return obj != null && typeof obj === 'object' && !(obj instanceof Array);
}

/** @see https://stackoverflow.com/a/679915#59787784 */
export function isObjectEmpty<T>(obj: T): boolean {
  for (const k in obj) return false;
  return true;
}

/**
 * Deep copy simple objects, for more complex object with circular references , getters/setters and other non json serializable objects use _.cloneDeep
 *  @see https://stackoverflow.com/questions/48494350/what-are-the-dangers-of-deep-copying-objects-using-json-parsejson-stringifyobj
 */
export function simpleDeepCopyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function wholeObjectComparator<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function doKeysMatchObject<T>(
  obj: Record<string, T>,
  keys: string[],
): boolean {
  if (Object.keys(obj).length !== keys.length) return false;
  return keys.every((key: string): boolean =>
    Object.prototype.hasOwnProperty.call(obj, key),
  );
}

type GenericObject = Record<string, unknown>;

/** @see https://gist.github.com/ScriptedAlchemy/25be43bfb45baaf047a7991de4b64127 */
export function deepMergeObjects<T extends GenericObject>(...objects: T[]): T {
  return objects.reduce((acc: T, cur: T): T => {
    Object.keys(cur).forEach((key: keyof T): void => {
      const accVal: T[keyof T] = acc[key];
      const curVal: T[keyof T] = cur[key];

      if (Array.isArray(accVal) && Array.isArray(curVal)) {
        acc[key] = curVal;
      } else if (isObject(accVal) && isObject(curVal)) {
        (acc[key] as GenericObject) = deepMergeObjects(
          accVal as GenericObject,
          curVal as GenericObject,
        );
      } else {
        acc[key] = curVal;
      }
    });

    return acc;
  }, {} as T);
}

export const DEFAULT_PATH_SEPARATOR = '/';
export function extractObjectValue<T>(
  /** Data object to extract field values from */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any | undefined,
  /**
   * Path to field in object separated by '/'
   * e.g. object={name:'John', address:{apt:'123', city:'San Diego'}, friends: [{name: 'Jane'}, {name: 'Joe'}]}
   * keyPath="name" => 'John'
   * keyPath="address" => {apt:'123', city:'San Diego'}
   * keyPath="address/apt" => '123'
   * keyPath="friends" => [{name: 'Jane'}, {name: 'Joe'}]
   * keyPath="friends/{i}/name" => ['Jane', 'Joe']
   * keyPath="friends/0/name" => 'Jane'
   */
  keyPath: string,
  /** Override default '/' path separator
   * e.g. pathSeparator="." for keyPath = "address.apt"
   */
  pathSeparator: string = DEFAULT_PATH_SEPARATOR,
  suppressNonExistentFieldWarning: boolean = false,
  defaultValueIfFieldNotFound?: T,
): T | undefined {
  if (obj == null) return;

  // Split the path into an array of field names
  const fields: string[] = keyPath.split(pathSeparator);

  // If there are no more fields; return the value of the current object
  if (fields.length === 0 || (fields.length === 1 && fields[0] === '')) {
    return obj;
  }

  // Extract the first field from the array
  // Field will not be undefined as we just did the check for array length above, so cast to string
  const field: string = fields.shift() as string;

  // If path contains {i} or similar; loop through array and map values
  // If nothing after path; result will be same if {i} was not provided, i.i. full array contents
  // e.g. path="array/{i}" is the same as path="array"
  if (field.match(/{\D*}/gm) && Array.isArray(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return obj.map((value: any): T | undefined =>
      extractObjectValue(
        value,
        fields.join(pathSeparator),
        pathSeparator,
        suppressNonExistentFieldWarning,
        defaultValueIfFieldNotFound,
      ),
    ) as unknown as T;
    // .find(typedNullCheck);
  }

  // User provided a non-existent field
  if (obj[field] == null) {
    if (!suppressNonExistentFieldWarning) {
      console.warn(
        `Field with keyPath obj[${keyPath}] does not exist in object`,
      );
    }
    if (defaultValueIfFieldNotFound !== undefined) {
      return defaultValueIfFieldNotFound;
    }
  }

  return extractObjectValue(
    obj[field],
    fields.join(pathSeparator),
    pathSeparator,
    suppressNonExistentFieldWarning,
    defaultValueIfFieldNotFound,
  );
}

export function setObjectValue(
  /** Data object to set field values to */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any | undefined,
  /**
   * Path to field in object separated by '/'
   * e.g. object={name:'John', address:{apt:'123', city:'San Diego'}, friends: [{name: 'Jane'}, {name: 'Joe'}]}
   * keyPath="name" => 'John'
   * keyPath="address" => {apt:'123', city:'San Diego'}
   * keyPath="address/apt" => '123'
   * keyPath="friends" => [{name: 'Jane'}, {name: 'Joe'}]
   * keyPath="friends/{i}/name" => ['Jane', 'Joe']
   * keyPath="friends/0/name" => 'Jane'
   */
  keyPath: string,
  /** Value to set at the specified path */
  value: unknown | undefined = undefined,
  pathSeparator: string = DEFAULT_PATH_SEPARATOR,
): void {
  if (obj == null || keyPath === '') return;

  // Split the path into an array of field names
  const fields: string[] = keyPath.split(pathSeparator);

  // Extract the first field from the array
  const field = fields.shift() as string;

  if (field === '{i}') {
    // Handle wildcard: iterate over array elements
    if (Array.isArray(obj)) {
      obj.forEach((item: unknown, index: number): void => {
        if (fields.length === 0) {
          obj[index] = value; // Directly set the array element if this is the last field
        } else {
          setObjectValue(
            item,
            fields.join(pathSeparator),
            value,
            pathSeparator,
          );
        }
      });
    }
    return;
  }

  const isIndex: boolean = /^\d+$/.test(field);
  if (fields.length === 0) {
    // If this is the last field in the path, set the value
    if (isIndex) {
      if (!Array.isArray(obj))
        throw new Error(`Expected array but found: ${typeof obj}`);
      obj[Number(field)] = value;
    } else {
      obj[field] = value;
    }
    return;
  }

  // Traverse or create intermediate paths
  if (isIndex) {
    if (!Array.isArray(obj))
      throw new Error(`Expected array but found: ${typeof obj}`);
    const index: number = Number(field);
    obj[index] = obj[index] ?? {}; // Ensure the path exists
    setObjectValue(
      obj[index],
      fields.join(pathSeparator),
      value,
      pathSeparator,
    );
  } else {
    obj[field] = obj[field] ?? {}; // Ensure the path exists
    setObjectValue(
      obj[field],
      fields.join(pathSeparator),
      value,
      pathSeparator,
    );
  }
}
