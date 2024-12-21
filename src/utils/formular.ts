export function overClock(base: number, increase: number): number {
  const percentage = increase / 100;
  return +(base * percentage).toFixed(1);
}
