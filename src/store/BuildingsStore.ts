import Building from '@/classes/Building';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Building> {
  constructor() {
    super(Building, 'buildings');
  }
}

const store: S = new S();
export default store;
