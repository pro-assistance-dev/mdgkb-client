import Comment from '@/classes/Comment';
import ClassHelper from '@/services/ClassHelper';

export default class DivisionComment {
  id?: string;
  divisionId?: string;
  commentId?: string;
  comment: Comment = new Comment();

  constructor(divisionComment?: DivisionComment) {
    ClassHelper.BuildClass(this, divisionComment);
  }

  static GetClassName(): string {
    return 'divisionComment';
  }
}
