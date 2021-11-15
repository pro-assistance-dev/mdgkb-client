import Comment from '@/classes/comments/Comment';
import IComment from '@/interfaces/comments/IComment';
import IPageComment from '@/interfaces/page/IPageComment';

export default class PageComment implements IPageComment {
  id?: string;

  comment: IComment = new Comment();
  commentId?: string;

  pageId?: string;

  constructor(pageDocument?: IPageComment) {
    if (!pageDocument) {
      return;
    }
    this.id = pageDocument.id;
    this.commentId = pageDocument.commentId;
    if (pageDocument.comment) {
      this.comment = new Comment(pageDocument.comment);
    }
    this.pageId = pageDocument.pageId;
  }
}
