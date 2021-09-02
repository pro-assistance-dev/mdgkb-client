import Comment from '@/classes/Comment';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
import IComment from '@/interfaces/IComment';

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
