import IComment from '@/interfaces/comments/IComment';

export default interface IDoctorComment {
  id?: string;
  doctorId?: string;
  commentId?: string;

  comment: IComment;
}
