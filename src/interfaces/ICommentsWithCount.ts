import Comment from '@/classes/Comment';

export default interface ICommentsWithCount {
  comments: Comment[];
  count: number;
}
