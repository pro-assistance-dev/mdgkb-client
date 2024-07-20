import DailyMenuItem from '@/classes/DailyMenuItem';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<DailyMenuItem> {
  constructor() {
    super(DailyMenuItem, 'dayly-menus-items');
  }
}
const store: S = new S();
export default store;
