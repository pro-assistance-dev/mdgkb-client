import IRole from '@/interfaces/IRole';
import { RoleName } from '@/interfaces/RoleName';

export default class Role implements IRole {
  id?: string;
  name: RoleName = RoleName.User;

  constructor(i?: IRole) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
  }
}
