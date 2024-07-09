type IWithRating = {
  rating: number;
};

export default function countRating(items: IWithRating[]): number {
  const withoutZero = items.filter((o: IWithRating) => o.rating !== 0);
  let sum = 0;
  withoutZero.forEach((o: IWithRating) => (sum = sum + o.rating));
  const rate = sum / withoutZero.length;

  return isNaN(rate) ? 0 : Number((sum / withoutZero.length).toFixed(2));
}
