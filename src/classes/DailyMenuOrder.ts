import DailyMenuOrderItem from '@/classes/DailyMenuOrderItem';
import Form from '@/classes/Form';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import IDailyMenuOrderItem from '@/interfaces/IDailyMenuOrderItem';
import IForm from '@/interfaces/IForm';

export default class DailyMenuOrder implements IDailyMenuOrder {
  id?: string;
  date: Date = new Date();
  boxNumber = 0;
  number = 0;
  price = 0;
  dailyMenuOrderItems: IDailyMenuOrderItem[] = [];
  formValue: IForm = new Form();
  formValueId?: string;

  constructor(i?: IDailyMenuOrder) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.date) {
      this.date = new Date(i.date);
    }
    if (i.dailyMenuOrderItems) {
      this.dailyMenuOrderItems = i.dailyMenuOrderItems.map((item: IDailyMenuOrderItem) => new DailyMenuOrderItem(item));
    }
    this.boxNumber = i.boxNumber;
    this.number = i.number;
    this.price = i.price;
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
    this.formValueId = i.formValueId;
  }

  private addToDailyMenuItems(dailyMenuItem: IDailyMenuItem): void {
    const index = this.dailyMenuOrderItems.findIndex((d: IDailyMenuOrderItem) => dailyMenuItem.id === d.dailyMenuItem.id);
    if (index !== -1) {
      this.dailyMenuOrderItems[index].quantity++;
    } else {
      const newOrderItem = new DailyMenuOrderItem();
      newOrderItem.dailyMenuItem = dailyMenuItem;
      newOrderItem.dailyMenuItemId = dailyMenuItem.id;
      newOrderItem.quantity = 1;
      this.dailyMenuOrderItems.push(newOrderItem);
    }
  }

  addDailyMenuItem(dailyMenuItem: IDailyMenuItem): void {
    this.price += dailyMenuItem.price;
    this.addToDailyMenuItems(dailyMenuItem);
  }

  removeDailyMenuItem(dailyMenuItem: IDailyMenuItem): void {
    this.price -= dailyMenuItem.price;
    this.removeFromDailyMenuItems(dailyMenuItem);
  }

  private removeFromDailyMenuItems(dailyMenuItem: IDailyMenuItem): void {
    const index = this.dailyMenuOrderItems.findIndex((d: IDailyMenuOrderItem) => dailyMenuItem.id === d.dailyMenuItem.id);
    if (index === -1) {
      return;
    }
    if (this.dailyMenuOrderItems[index].quantity > 0) {
      this.dailyMenuOrderItems[index].quantity--;
    } else {
      this.dailyMenuOrderItems.splice(index, 0);
    }
  }

  getItemQuantity(dailyMenuItem: IDailyMenuItem): number {
    const item = this.dailyMenuOrderItems.find((d: IDailyMenuOrderItem) => d.dailyMenuItemId === dailyMenuItem.id);
    return item ? item.quantity : 0;
  }

  getCaloricSum(): number {
    let sum = 0;
    this.dailyMenuOrderItems.forEach((item: IDailyMenuOrderItem) => {
      sum += item.dailyMenuItem.caloric * item.quantity;
    });
    return sum;
  }
}
