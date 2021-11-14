import IComment from '@/interfaces/comments/IComment';

export default interface IPageComment {
  id?: string;

  comment: IComment;
  commentId?: string;

  pageId?: string;
}
