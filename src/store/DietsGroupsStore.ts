import DietGroup from '@/classes/DietGroup';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<DietGroup> {
  constructor() {
    super(DietGroup, 'diets-groups');
  }
}

const store: S = new S();
export default store;
