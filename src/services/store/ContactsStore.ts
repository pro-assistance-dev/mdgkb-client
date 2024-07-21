import BaseStore from '@/services/BaseStore';
import Contact from '@/services/classes/Contact';

class S extends BaseStore<Contact> {
  constructor() {
    super(Contact, 'contacts');
  }
}

const store: S = new S();
export default store;
