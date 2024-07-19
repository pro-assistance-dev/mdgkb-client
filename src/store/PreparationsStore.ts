import Preparation from '@/classes/Preparation';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Preparation> {
  constructor() {
    super(Preparation, 'preparations');
  }
}

const store: S = new S();
export default store;
