import Role from '@/classes/Role';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Role> {
  constructor() {
    super(Role, 'roles');
  }
}

const store: S = new S();
export default store;
