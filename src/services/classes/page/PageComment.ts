import Comment from '@/classes/Comment';
import ClassHelper from '@/services/ClassHelper';

export default class PageComment {
  id?: string;

  comment: Comment = new Comment();
  commentId?: string;

  pageId?: string;

  constructor(i?: PageComment) {
    ClassHelper.BuildClass(this, i);
  }
}
