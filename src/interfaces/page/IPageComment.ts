import IComment from '@/interfaces/IComment';

export default interface IPageComment {
  id?: string;

  comment: IComment;
  commentId?: string;

  pageId?: string;
}
