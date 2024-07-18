import HospitalizationType from '@/classes/HospitalizationType';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<HospitalizationType> {
  constructor() {
    super(HospitalizationType, 'hospitalizations-types');
  }
}

const store: S = new S();
export default store;
