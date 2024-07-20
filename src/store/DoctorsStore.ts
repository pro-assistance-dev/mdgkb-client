import Doctor from '@/classes/Doctor';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Doctor> {
  constructor() {
    super(Doctor, 'doctors');
  }
}

const store: S = new S();
export default store;
