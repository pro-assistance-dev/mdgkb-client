import BaseStore from '@/services/BaseStore';
import Phone from '@/services/classes/Phone';

class S extends BaseStore<Phone> {
  constructor() {
    super(Phone, 'phones');
  }
}

const store: S = new S();
export default store;
