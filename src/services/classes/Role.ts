import ClassHelper from '@/services/ClassHelper';
import { RoleName } from '@/services/interfaces/RoleName';

export default class Role {
  id?: string;
  name: RoleName = RoleName.User;
  label = '';
  startPage = '';

  constructor(i?: Role) {
    ClassHelper.BuildClass(this, i);
  }
}
