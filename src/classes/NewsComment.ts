import Comment from '@/classes/Comment';
import ClassHelper from '@/services/ClassHelper';

export default class NewsComment {
  id?: string;
  newsId?: string;
  commentId?: string;
  comment: Comment = new Comment();

  constructor(newsComment?: NewsComment) {
    ClassHelper.BuildClass(this, newsComment);
  }

  static GetClassName(): string {
    return 'doctorComment';
  }
}
