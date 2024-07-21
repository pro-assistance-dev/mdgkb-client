import BaseStore from '@/services/BaseStore';
import UserAccount from '@/services/classes/UserAccount';

class S extends BaseStore<UserAccount> {
  constructor() {
    super(UserAccount, 'user-accounts');
  }
}

const store: S = new S();
export default store;
