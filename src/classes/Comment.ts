import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';

export default class Comment {
  id?: string;
  userId?: string;
  itemId?: string;
  text = '';
  publishedOn: Date = new Date();
  isEditing = false;
  modChecked = false;
  positive = false;
  title = '';
  rating = 0;
  answer = '';
  link = '';
  commentTo = '';
  news?: News;

  user: User = new User();

  constructor(comment?: Comment) {
    ClassHelper.BuildClass(this, comment);
    if (!comment) {
      return;
    }
    // if (comment.newsComment && comment.newsComment.news) {
    //   this.news = new News(comment.newsComment.news);
    //   this.title = this.news.title;
    //   this.commentTo = 'Новость';
    //   this.link = `/news/${this.news.id}`;
    // }
    // // if (comment.doctorComment && comment.doctorComment.doctor) {
    // //   this.doctor = new Doctor(comment.doctorComment.doctor);
    // //   this.title = this.doctor.employee.human.getFullName();
    // //   this.commentTo = 'Доктор';
    // //   this.link = `/doctors/${this.doctor.employee.human.slug}`;
    // // }
    // if (comment.divisionComment && comment.divisionComment.division) {
    //   this.division = new Division(comment.divisionComment.division);
    //   this.title = this.division.name;
    //   this.commentTo = 'Отделение';
    //   this.link = `/divisions/${this.division.id}`;
    // }
  }

  static GetClassName(): string {
    return 'comment';
  }
}
