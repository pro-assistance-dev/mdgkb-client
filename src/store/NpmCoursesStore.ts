import NpmCourse from '@/classes/NpmCourse';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<NpmCourse> {
  constructor() {
    super(NpmCourse, 'nmo-course');
  }
}

const store: S = new S();
export default store;
