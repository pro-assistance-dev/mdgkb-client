import DonorRule from '@/classes/DonorRule';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<DonorRule> {
  constructor() {
    super(DonorRule, 'donor-rules');
  }
}

const store: S = new S();
export default store;
