import ClassHelper from '@/services/ClassHelper';

export default class UserAccount {
  id?: string;
  login = '';
  email = '';

  constructor(i?: UserAccount) {
    ClassHelper.BuildClass(this, i);
  }
  static Create(): UserAccount {
    const item = new UserAccount();
    item.id = ClassHelper.CreateUUID();
    return item;
  }
}
