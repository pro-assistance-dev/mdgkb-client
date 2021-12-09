import Comment from '@/classes/comments/Comment';
import IComment from '@/interfaces/comments/IComment';
import IDoctorComment from '@/interfaces/IDoctorComment';

export default class DoctorComment implements IDoctorComment {
  id?: string;
  doctorId?: string;
  commentId?: string;
  comment: IComment = new Comment();

  constructor(doctorComment?: IDoctorComment) {
    if (!doctorComment) {
      return;
    }
    this.id = doctorComment.id;
    this.doctorId = doctorComment.doctorId;
    this.commentId = doctorComment.commentId;
    if (doctorComment.comment) {
      this.comment = new Comment(doctorComment.comment);
    }
  }
}
