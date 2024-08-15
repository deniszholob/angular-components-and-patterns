// Misc utilities

export function isDeviceMobileOrTablet(): boolean {
  const deviceRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return deviceRegex.test(navigator.userAgent);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectDiffLog(a: any, b: any): void {
  console.log(`Diff objects: `, { a, b });
  const delClr = 'color:red';
  const addClr = 'color:green';
  const aKeys: (keyof typeof a)[] = Object.keys(a);
  const bKeys: (keyof typeof b)[] = Object.keys(b);

  for (const key of aKeys) {
    const aVal = a[key];

    if (bKeys.includes(key)) {
      const bVal = b[key];
      if (aVal !== bVal) {
        console.log(`${String(key)}: ${aVal}`);
      } else {
        console.log(`${String(key)}: %c-${aVal}%c+${bVal}`, delClr, addClr);
      }
    } else {
      console.log(`%c-${String(key)}: ${aVal}`, delClr);
    }
  }

  for (const key of bKeys) {
    if (!aKeys.includes(key)) {
      const bVal = b[key];
      console.log(`%c+${String(key)}: ${bVal}`, addClr);
    }
  }
}
