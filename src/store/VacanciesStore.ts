import Vacancy from '@/classes/Vacancy';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Vacancy> {
  constructor() {
    super(Vacancy, 'vacancies');
  }
}

const store: S = new S();
export default store;
