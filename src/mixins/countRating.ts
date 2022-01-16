import IComment from '@/interfaces/comments/IComment';

interface IWithComment {
  comment: IComment;
}

export default function countRating(items: IWithComment[]): string {
  const withoutZero = items.filter((o: IWithComment) => o.comment.rating !== 0);
  let sum = 0;
  withoutZero.forEach((o: IWithComment) => (sum = sum + o.comment.rating));
  const rate = sum / withoutZero.length;

  return isNaN(rate) ? '' : (sum / withoutZero.length).toFixed(2);
}
