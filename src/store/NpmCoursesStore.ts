import NmoCourse from '@/classes/NmoCourse';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<NmoCourse> {
  constructor() {
    super(NmoCourse, 'nmo-course');
  }
}

const store: S = new S();
export default store;
