import IComment from '@/interfaces/comments/IComment';
import INewsComment from '@/interfaces/news/INewsComment';

export default interface State {
  comments: IComment[];
  count: number;
  positiveMode: boolean;
  comment: INewsComment;
}
