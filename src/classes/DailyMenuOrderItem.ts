import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import ClassHelper from '@/services/ClassHelper';

export default class DailyMenuOrderItem {
  id?: string;
  quantity = 0;
  price = 0;
  dailyMenuOrderId?: string;
  dailyMenuOrder: DailyMenuOrder = new DailyMenuOrder();
  dailyMenuItemId?: string;
  dailyMenuItem: DailyMenuItem = new DailyMenuItem();

  constructor(i?: DailyMenuOrderItem) {
    ClassHelper.BuildClass(this, i);
  }

  getWeightSum(): number {
    return this.quantity * this.dailyMenuItem.weight;
  }

  getCaloricSum(): number {
    return this.quantity * this.dailyMenuItem.caloric;
  }

  getPriceSum(): number {
    return this.quantity * this.dailyMenuItem.price;
  }
}
