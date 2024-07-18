import Diet from '@/classes/Diet';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Diet> {
  constructor() {
    super(Diet, 'diets');
  }
}
const store: S = new S();
export default store;
