import Comment from '@/classes/Comment';
import NewsComment from '@/classes/NewsComment';

export default interface State {
  comments: Comment[];
  count: number;
  positiveMode: boolean;
  comment: NewsComment;
}
