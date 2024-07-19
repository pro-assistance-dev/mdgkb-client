import BaseStore from '@/services/BaseStore';
import Role from '@/services/classes/Role';

class S extends BaseStore<Role> {
  constructor() {
    super(Role, 'roles');
  }
}

const store: S = new S();
export default store;
