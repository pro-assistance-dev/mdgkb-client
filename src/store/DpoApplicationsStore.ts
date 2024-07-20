import DpoApplication from '@/classes/DpoApplication';
import BaseStore from '@/services/BaseStore';
class S extends BaseStore<DpoApplication> {
  constructor() {
    super(DpoApplication, 'dpo-applications');
  }
}

const store: S = new S();
export default store;
