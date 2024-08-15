/** Ex: My wonderful component */
export function toTitleCase(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function camelCaseToTitleWords(input: string): string {
  const words: string = input.replace(/([A-Z])/g, ' $1');
  return toTitleCase(words);
}

/** Ex: My Wonderful Component */
export function toWordCase(input: string): string {
  return input.replace(/\w\S*/g, toTitleCase);
}

/** Ex: my-wonderful-component */
export function toDashCaseName(input: string): string {
  return underscoreToDash(spaceToDash(input.toLocaleLowerCase().trim()));
}

/** Ex: MyWonderfulComponent */
export function toUpperCamelCaseName(input: string): string {
  return toCamelCase(toTitleCase(input));
}

/** Ex: My Wonderful Component */
export function toUpperReadableName(input: string): string {
  return toWordCase(toTitleCase(dashToSpace(input)));
}

/** Ex: MY_WONDERFUL_COMPONENT */
export function toConstantCaseName(input: string): string {
  return dashToUnderscore(input.toUpperCase());
}

/** Ex: myWonderfulComponent */
export function toCamelCase(input: string): string {
  return input.replace(/[- _]([a-z])/gi, (all, letter) => letter.toUpperCase());
}

/** Ex: my-wonderful-component */
function spaceToDash(input: string): string {
  return input.replace(/\s/g, '-');
}

/** Ex: my-wonderful-component */
function underscoreToDash(input: string): string {
  return input.replace(/_/g, '-');
}

/** Ex: my wonderful component */
function dashToSpace(input: string): string {
  return input.replace(/-/g, ' ');
}

/** Ex: my_wonderful_component */
function dashToUnderscore(input: string): string {
  return input.replace(/-/g, '_');
}

export function arrayToStingList({
  arr,
  delimiter = '',
  prefix = '',
}: {
  arr: string[];
  delimiter?: string;
  prefix?: string;
}): string {
  return arr.length > 0
    ? `${prefix}${arr.reduce(
        (acc: string, curr: string): string =>
          `${acc.trim()}${delimiter}${prefix}${curr.trim()}`,
      )}`
    : '';
}

export function keyValToString<T>([k, v]: [string, T]): string {
  return `${toWordCase(k)} : ${v}`;
}
