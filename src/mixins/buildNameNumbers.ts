export default function buildNameNumbers(array: Array<unknown>, titles: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return (
    array.length +
    ' ' +
    titles[array.length % 100 > 4 && array.length % 100 < 20 ? 2 : cases[array.length % 10 < 5 ? array.length % 10 : 5]]
  );
}
