import IComment from '@/interfaces/IComment';

export default interface IDivisionComment {
  id?: string;
  divisionId?: string;
  commentId?: string;

  comment: IComment;
}
