import Comment from '@/classes/Comment';

export default interface IPageComment {
  id?: string;

  comment: Comment;
  commentId?: string;

  pageId?: string;
}
