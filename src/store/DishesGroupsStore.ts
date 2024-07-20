import DishesGroup from '@/classes/DishesGroup';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<DishesGroup> {
  constructor() {
    super(DishesGroup, 'dishes-groups');
  }
}
const store: S = new S();
export default store;
