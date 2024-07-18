import Specialization from '@/classes/Specialization';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Specialization> {
  constructor() {
    super(Specialization, 'specializations');
  }
}

const store: S = new S();
export default store;
