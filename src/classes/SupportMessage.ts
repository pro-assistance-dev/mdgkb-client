import User from '@/classes/User';
import ISupportMessage from '@/interfaces/ISupportMessage';

export default class SupportMessage implements ISupportMessage {
  id?: string;
  theme = '';
  question = '';
  answer = '';
  date = new Date();
  user: User = new User();
  userId?: string;
  isNew = true;

  constructor(i?: ISupportMessage) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.theme = i.theme;
    this.question = i.question;
    if (i.user) {
      this.user = new User(i.user);
    }
    if (i.date) {
      this.date = new Date(i.date);
    }
    this.userId = i.userId;
    this.answer = i.answer;
    this.isNew = i.isNew;
  }

  getThemeOrFirstPhrase(): string {
    return this.theme ? this.theme : this.question?.substring(0, 60);
  }

  changeNewStatus(status?: boolean): void {
    if (status !== undefined) {
      this.isNew = status;
    } else {
      this.isNew = !this.isNew;
    }
  }
}
