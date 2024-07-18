import PaidService from '@/classes/PaidService';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<PaidService> {
  constructor() {
    super(PaidService, 'paid-services');
  }
}

const store: S = new S();
export default store;
