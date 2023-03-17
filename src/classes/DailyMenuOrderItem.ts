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

  static Create(dailyMenuItem: DailyMenuItem): DailyMenuOrderItem {
    const newOrderItem = new DailyMenuOrderItem();
    newOrderItem.dailyMenuItem = dailyMenuItem;
    newOrderItem.dailyMenuItemId = dailyMenuItem.id;
    newOrderItem.quantity = 1;
    newOrderItem.price = dailyMenuItem.price;
    return newOrderItem;
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

  increment(): void {
    this.quantity++;
    this.price += this.dailyMenuItem.price;
  }

  decrement(): void {
    this.quantity--;
    this.price -= this.dailyMenuItem.price;
  }
}
