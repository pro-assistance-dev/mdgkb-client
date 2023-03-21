import User from '@/classes/User';
import IChild from '@/interfaces/IChild';
import Human from '@/services/classes/Human';
import IUser from '@/services/interfaces/IUser';

export default class Child implements IChild {
  id?: string;
  human = new Human();
  humanId?: string;
  user?: IUser;
  userId?: string;
  constructor(i?: IChild) {
    if (!i) {
      return;
    }
    this.id = i.id;

    this.human = new Human(i.human);
    this.humanId = i.humanId;
    if (i.user) {
      this.user = new User();
    }
    this.userId = i.userId;
  }
}
