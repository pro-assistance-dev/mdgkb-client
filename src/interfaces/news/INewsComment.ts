import IComment from '@/interfaces/comments/IComment';

export default interface INewsComment {
  id?: string;
  newsId?: string;
  commentId?: string;

  comment: IComment;
}
