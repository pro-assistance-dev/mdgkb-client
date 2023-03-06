import { RoleName } from '@/interfaces/RoleName';
import ClassHelper from '@/services/ClassHelper';

export default class Role {
  id?: string;
  name: RoleName = RoleName.User;
  label = '';
  startPage = '';

  constructor(i?: Role) {
    ClassHelper.BuildClass(this, i);
  }
}
