import User from '@/classes/user/User';
import INewsComment from '@/interfaces/news/INewsComment';
import IUser from '@/interfaces/users/IUser';

export default class NewsComment implements INewsComment {
  id?;
  newsId = '';
  userId = '';
  text = '';
  publishedOn: Date = new Date();
  user: IUser = new User();
  isEditing = false;

  constructor(i?: INewsComment) {
    if (!i) return;
    this.id = i.id;
    this.newsId = i.newsId;
    this.userId = i.userId;
    this.text = i.text;
    this.publishedOn = i.publishedOn;
    this.user = new User(i.user);
    this.isEditing = i.isEditing;
  }
}
