export function stringToEnum<T extends object>(
  enumObj: T,
  value?: string | number,
): T[keyof T] | null {
  if (value == null) return null;

  for (const key in enumObj) {
    if (enumObj[key] === value) {
      return enumObj[key] ?? null;
    }
  }

  return null;
}

export function stripStartString(original: string, remove: string): string {
  return original.startsWith(remove) ? original.slice(remove.length) : original;
}
