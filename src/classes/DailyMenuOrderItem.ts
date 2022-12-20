import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import IDailyMenuOrderItem from '@/interfaces/IDailyMenuOrderItem';

export default class DailyMenuOrderItem implements IDailyMenuOrderItem {
  id?: string;
  quantity = 0;
  dailyMenuOrderId?: string;
  dailyMenuOrder: IDailyMenuOrder = new DailyMenuOrder();
  dailyMenuItemId?: string;
  dailyMenuItem: IDailyMenuItem = new DailyMenuItem();

  constructor(i?: IDailyMenuOrderItem) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.quantity = i.quantity;
    if (i.dailyMenuItem) {
      this.dailyMenuItem = new DailyMenuItem(i.dailyMenuItem);
    }
    this.dailyMenuItemId = i.dailyMenuItemId;
    if (i.dailyMenuOrder) {
      this.dailyMenuOrder = new DailyMenuOrder(i.dailyMenuOrder);
    }
    this.dailyMenuOrderId = i.dailyMenuOrderId;
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
