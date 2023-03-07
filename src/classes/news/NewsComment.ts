import Comment from '@/classes/Comment';
import IComment from '@/interfaces/comments/IComment';
import INewsComment from '@/interfaces/news/INewsComment';

export default class NewsComment implements INewsComment {
  id?: string;
  newsId?: string;
  commentId?: string;
  comment: IComment = new Comment();

  constructor(newsComment?: INewsComment) {
    if (!newsComment) {
      return;
    }
    this.id = newsComment.id;
    this.newsId = newsComment.newsId;
    this.commentId = newsComment.commentId;
    if (newsComment.comment) {
      this.comment = new Comment(newsComment.comment);
    }
  }
}
