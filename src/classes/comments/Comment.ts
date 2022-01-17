import Division from '@/classes/buildings/Division';
import Doctor from '@/classes/Doctor';
import News from '@/classes/news/News';
import User from '@/classes/User';
import IDivision from '@/interfaces/buildings/IDivision';
import IComment from '@/interfaces/comments/IComment';
import IDoctor from '@/interfaces/IDoctor';
import IUser from '@/interfaces/IUser';
import INews from '@/interfaces/news/INews';

export default class Comment implements IComment {
  id?: string;
  userId?: string;
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
  news?: INews;
  doctor?: IDoctor;
  division?: IDivision;
  newsComment?: IComment;
  doctorComment?: IComment;
  divisionComment?: IComment;

  user: IUser = new User();

  constructor(comment?: IComment) {
    if (!comment) {
      return;
    }
    this.id = comment.id;
    this.userId = comment.userId;
    this.text = comment.text;
    this.publishedOn = comment.publishedOn;
    this.isEditing = comment.isEditing;
    this.rating = comment.rating;
    this.modChecked = comment.modChecked;
    this.answer = comment.answer;
    this.positive = comment.positive;
    if (comment.user) {
      this.user = new User(comment.user);
    }
    if (comment.newsComment && comment.newsComment.news) {
      this.news = new News(comment.newsComment.news);
      this.title = this.news.title;
      this.commentTo = 'Новость';
    }
    if (comment.doctorComment && comment.doctorComment.doctor) {
      this.doctor = new Doctor(comment.doctorComment.doctor);
      this.title = this.doctor.human.getFullName();
      this.commentTo = 'Доктор';
    }
    if (comment.divisionComment && comment.divisionComment.division) {
      this.division = new Division(comment.divisionComment.division);
      this.title = this.division.name;
      this.commentTo = 'Отделение';
    }
  }
}
