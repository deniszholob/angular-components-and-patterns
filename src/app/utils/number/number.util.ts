// Number utilities

export function wrapValue(v: number, maxV: number): number {
  return (v + maxV) % maxV;
}
