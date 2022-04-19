import IWithComment from '@/interfaces/IWithComment';

export default function countRating(items: IWithComment[]): number {
  const withoutZero = items.filter((o: IWithComment) => o.comment.rating !== 0);
  let sum = 0;
  withoutZero.forEach((o: IWithComment) => (sum = sum + o.comment.rating));
  const rate = sum / withoutZero.length;

  return isNaN(rate) ? 0 : Number((sum / withoutZero.length).toFixed(2));
}
