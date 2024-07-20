import ResidencyCourse from '@/classes/ResidencyCourse';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<ResidencyCourse> {
  constructor() {
    super(ResidencyCourse, 'residency-courses');
  }
}

const store: S = new S();
export default store;
