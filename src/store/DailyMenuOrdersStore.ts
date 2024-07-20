import DailyMenuOrder from '@/classes/DailyMenuOrder';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<DailyMenuOrder> {
  constructor() {
    super(DailyMenuOrder, 'dayly-menu-orders');
  }
}
const store: S = new S();
export default store;
