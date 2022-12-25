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
    this.createClass(i);
  }

  createClass(i?: IDailyMenuOrder): void {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.date) {
      this.date = new Date(i.date);
    } else {
      this.date = new Date();
    }
    if (i.dailyMenuOrderItems) {
      this.dailyMenuOrderItems = i.dailyMenuOrderItems.map((item: IDailyMenuOrderItem) => new DailyMenuOrderItem(item));
    } else {
      this.dailyMenuOrderItems = [];
    }
    this.boxNumber = i.boxNumber;
    this.number = i.number;
    this.price = i.price;
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    } else {
      this.formValue = new Form();
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
    this.setLocalStorage();
  }

  increaseDailyMenuOrderItem(dailyMenuItem: IDailyMenuItem): void {
    this.price += dailyMenuItem.price;
    this.addToDailyMenuItems(dailyMenuItem);
  }

  decreaseDailyMenuOrderItem(dailyMenuItem: IDailyMenuItem): void {
    this.price -= dailyMenuItem.price;
    this.removeFromDailyMenuItems(dailyMenuItem);
    this.setLocalStorage();
  }

  private removeFromDailyMenuItems(dailyMenuItem: IDailyMenuItem): void {
    const index = this.dailyMenuOrderItems.findIndex((d: IDailyMenuOrderItem) => dailyMenuItem.id === d.dailyMenuItem.id);
    if (index === -1) {
      return;
    }
    if (this.dailyMenuOrderItems[index].quantity > 1) {
      this.dailyMenuOrderItems[index].quantity--;
    } else {
      this.dailyMenuOrderItems.splice(index, 1);
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

  removeDailyMenuOrderItem(item: IDailyMenuOrderItem): void {
    const index = this.dailyMenuOrderItems.findIndex((d: IDailyMenuOrderItem) => d.id === item.id);
    if (index === -1) {
      return;
    }
    this.dailyMenuOrderItems.splice(index, 1);
    this.setLocalStorage();
  }

  setLocalStorage(): void {
    localStorage.setItem('dailyMenuOrder', JSON.stringify(this));
  }

  reproduceFromStore(): void {
    const newOrder = localStorage.getItem('dailyMenuOrder');
    if (!newOrder) {
      return;
    }
    this.createClass(JSON.parse(newOrder));
  }

  removeFromLocalStore(): void {
    localStorage.removeItem('dailyMenuOrder');
  }
}
