import Comment from '@/classes/comments/Comment';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IComment from '@/interfaces/comments/IComment';

export default class divisionComment implements IDivisionComment {
  id?: string;
  divisionId?: string;
  commentId?: string;
  comment: IComment = new Comment();

  constructor(divisionComment?: IDivisionComment) {
    if (!divisionComment) {
      return;
    }
    this.id = divisionComment.id;
    this.divisionId = divisionComment.divisionId;
    this.commentId = divisionComment.commentId;
    if (divisionComment.comment) {
      this.comment = new Comment(divisionComment.comment);
    }
  }
}
