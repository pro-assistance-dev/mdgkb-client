import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import IDailyMenuOrderItem from '@/interfaces/IDailyMenuOrderItem';
import ClassHelper from '@/services/ClassHelper';

export default class DailyMenuOrderItem implements IDailyMenuOrderItem {
  id?: string;
  quantity = 0;
  price = 0;
  dailyMenuOrderId?: string;
  dailyMenuOrder: IDailyMenuOrder = new DailyMenuOrder();
  dailyMenuItemId?: string;
  dailyMenuItem: IDailyMenuItem = new DailyMenuItem();

  constructor(i?: IDailyMenuOrderItem) {
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
