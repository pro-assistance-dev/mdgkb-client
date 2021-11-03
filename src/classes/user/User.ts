import Human from '@/classes/Human';
import IUser from '@/interfaces/users/IUser';

export default class User implements IUser {
  id?: string;
  email = '';
  password?: string = '';

  human = new Human();
  humanId?: string;

  constructor(user?: IUser) {
    if (!user) return;
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;

    this.human = new Human(user.human);
    this.humanId = user.humanId;
  }
}
