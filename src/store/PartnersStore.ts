import Partner from '@/classes/Partner';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Partner> {
  constructor() {
    super(Partner, 'partners');
  }
}

const store: S = new S();
export default store;
