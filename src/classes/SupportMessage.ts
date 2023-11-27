import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';

export default class SupportMessage {
  id?: string;
  theme = '';
  question = '';
  answer = '';
  date = new Date();
  user: User = new User();
  userId?: string;
  isNew = true;

  constructor(i?: SupportMessage) {
    ClassHelper.BuildClass(this, i);
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

  static GetClassName(): string {
    return 'supportMessage';
  }
}
