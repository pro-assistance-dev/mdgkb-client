import IComment from '@/interfaces/comments/IComment';

export default interface IDivisionComment {
  id?: string;
  divisionId?: string;
  commentId?: string;

  comment: IComment;
}
