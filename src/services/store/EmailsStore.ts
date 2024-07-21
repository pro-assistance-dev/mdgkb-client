import BaseStore from '@/services/BaseStore';
import Email from '@/services/classes/Email';

class S extends BaseStore<Email> {
  constructor() {
    super(Email, 'emails');
  }
}

const store: S = new S();
export default store;
