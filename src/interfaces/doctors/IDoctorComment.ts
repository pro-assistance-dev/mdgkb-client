import IComment from '@/interfaces/IComment';

export default interface IDoctorComment {
  id?: string;
  doctorId?: string;
  commentId?: string;

  comment: IComment;
}
