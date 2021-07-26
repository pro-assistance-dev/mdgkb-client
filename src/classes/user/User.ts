import IUser from '@/interfaces/users/IUser';

export default class User implements IUser {
  id?: string;
  email = '';
  password?: string = '';

  constructor(i?: IUser) {
    if (!i) return;
    this.id = i.id;
    this.email = i.email;
    this.password = i.password;
  }
}
