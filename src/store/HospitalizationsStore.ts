import Hospitalization from '@/classes/Hospitalization';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Hospitalization> {
  constructor() {
    super(Hospitalization, 'hospitalizations');
  }
}

const store: S = new S();
export default store;
