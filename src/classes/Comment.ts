import User from '@/classes/user/User';
import IComment from '@/interfaces/IComment';
import IUser from '@/interfaces/users/IUser';

export default class Comment implements IComment {
  id?: string;
  userId?: string;
  text = '';
  publishedOn: Date = new Date();
  isEditing = false;

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
    if (comment.user) {
      this.user = new User(comment.user);
    }
  }
}
