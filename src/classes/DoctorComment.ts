import Comment from '@/classes/comments/Comment';
import IComment from '@/interfaces/comments/IComment';
import ClassHelper from '@/services/ClassHelper';

export default class DoctorComment {
  id?: string;
  doctorId?: string;
  commentId?: string;
  comment: IComment = new Comment();

  constructor(i?: DoctorComment) {
    ClassHelper.BuildClass(this, i);
  }
}
