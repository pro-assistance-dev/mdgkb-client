import DishSample from '@/classes/DishSample';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<DishSample> {
  constructor() {
    super(DishSample, 'dishes-samples');
  }
}
const store: S = new S();
export default store;
