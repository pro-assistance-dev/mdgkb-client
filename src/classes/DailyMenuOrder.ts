import DailyMenuOrderItem from '@/classes/DailyMenuOrderItem';
import Form from '@/classes/Form';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import IDailyMenuOrderItem from '@/interfaces/IDailyMenuOrderItem';
import IForm from '@/interfaces/IForm';
import MillisecondsTime from '@/services/MillisecondsTime';

export default class DailyMenuOrder implements IDailyMenuOrder {
  id?: string;
  date: Date = new Date();
  boxNumber = 0;
  number = 0;
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
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    } else {
      this.formValue = new Form();
    }
    this.formValueId = i.formValueId;
  }

  private addToDailyMenuItems(dailyMenuItem: IDailyMenuItem): void {
    console.log(dailyMenuItem.price);
    const index = this.dailyMenuOrderItems.findIndex((d: IDailyMenuOrderItem) => dailyMenuItem.id === d.dailyMenuItem.id);
    if (index !== -1) {
      this.dailyMenuOrderItems[index].quantity++;
      this.dailyMenuOrderItems[index].price += dailyMenuItem.price;
    } else {
      const newOrderItem = new DailyMenuOrderItem();
      newOrderItem.dailyMenuItem = dailyMenuItem;
      newOrderItem.dailyMenuItemId = dailyMenuItem.id;
      newOrderItem.quantity = 1;
      newOrderItem.price = dailyMenuItem.price;
      this.dailyMenuOrderItems.push(newOrderItem);
    }
  }

  increaseDailyMenuOrderItem(dailyMenuItem: IDailyMenuItem): void {
    this.addToDailyMenuItems(dailyMenuItem);
    this.setLocalStorage();
  }

  decreaseDailyMenuOrderItem(dailyMenuItem: IDailyMenuItem): void {
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
      this.dailyMenuOrderItems[index].price -= dailyMenuItem.price;
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
    const localStorDate = Date.parse(JSON.parse(newOrder).date);
    const storagePeriod = 12;
    if (new Date().getTime() > localStorDate + MillisecondsTime.Hour * storagePeriod) {
      localStorage.removeItem('dailyMenuOrder');
      return;
    }
    this.createClass(JSON.parse(newOrder));
  }

  removeFromLocalStore(): void {
    localStorage.removeItem('dailyMenuOrder');
  }
  getPriceSum(): number {
    let sum = 0;
    this.dailyMenuOrderItems.forEach((i: IDailyMenuOrderItem) => {
      sum += i.price;
    });
    return sum;
  }

  filterAndGetNonActualDailyMenuItems(menu: IDailyMenu): IDailyMenuOrderItem[] {
    const nonActualItems: IDailyMenuOrderItem[] = [];
    this.dailyMenuOrderItems = this.dailyMenuOrderItems.filter((orderItem: IDailyMenuOrderItem) => {
      const availableMenuItemExists = menu.dailyMenuItems.some(
        (dailyMenuItem: IDailyMenuItem) => dailyMenuItem.id === orderItem.dailyMenuItem.id && dailyMenuItem.available
      );
      if (!availableMenuItemExists) {
        nonActualItems.push(orderItem);
      }
      return availableMenuItemExists;
    });
    this.setLocalStorage();
    return nonActualItems;
  }
}
