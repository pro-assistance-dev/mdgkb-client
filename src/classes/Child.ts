import User from '@/classes/User';
import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';

export default class Child {
  id?: string;
  human = new Human();
  humanId?: string;
  user?: User;
  userId?: string;
  constructor(i?: Child) {
    ClassHelper.BuildClass(this, i);
  }
}
