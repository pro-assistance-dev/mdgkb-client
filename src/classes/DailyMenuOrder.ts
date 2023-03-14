import DailyMenu from '@/classes/DailyMenu';
import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrderItem from '@/classes/DailyMenuOrderItem';
import Form from '@/classes/Form';
import ClassHelper from '@/services/ClassHelper';
import Time from '@/services/Time';

export default class DailyMenuOrder {
  id?: string;
  date: Date = new Date();
  boxNumber = 0;
  number = 0;
  @ClassHelper.GetClassConstructor(DailyMenuOrderItem)
  dailyMenuOrderItems: DailyMenuOrderItem[] = [];
  formValue: Form = new Form();
  formValueId?: string;

  constructor(i?: DailyMenuOrder) {
    ClassHelper.BuildClass(this, i);
  }

  private addToDailyMenuItems(dailyMenuItem: DailyMenuItem): void {
    const index = this.dailyMenuOrderItems.findIndex((d: DailyMenuOrderItem) => dailyMenuItem.id === d.dailyMenuItem.id);
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

  increaseDailyMenuOrderItem(dailyMenuItem: DailyMenuItem): void {
    this.addToDailyMenuItems(dailyMenuItem);
    this.setLocalStorage();
  }

  decreaseDailyMenuOrderItem(dailyMenuItem: DailyMenuItem): void {
    this.removeFromDailyMenuItems(dailyMenuItem);
    this.setLocalStorage();
  }

  private removeFromDailyMenuItems(dailyMenuItem: DailyMenuItem): void {
    const index = this.dailyMenuOrderItems.findIndex((d: DailyMenuOrderItem) => dailyMenuItem.id === d.dailyMenuItem.id);
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

  getItemQuantity(dailyMenuItem: DailyMenuItem): number {
    const item = this.dailyMenuOrderItems.find((d: DailyMenuOrderItem) => d.dailyMenuItemId === dailyMenuItem.id);
    return item ? item.quantity : 0;
  }

  getCaloricSum(): number {
    let sum = 0;
    this.dailyMenuOrderItems.forEach((item: DailyMenuOrderItem) => {
      sum += item.dailyMenuItem.caloric * item.quantity;
    });
    return sum;
  }

  removeDailyMenuOrderItem(item: DailyMenuOrderItem): void {
    const index = this.dailyMenuOrderItems.findIndex((d: DailyMenuOrderItem) => d.id === item.id);
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
    if (new Date().getTime() > localStorDate + Time.Hour * storagePeriod) {
      localStorage.removeItem('dailyMenuOrder');
      return;
    }
    ClassHelper.BuildClass(this, JSON.parse(newOrder));
  }

  removeFromLocalStore(): void {
    localStorage.removeItem('dailyMenuOrder');
  }
  getPriceSum(): number {
    let sum = 0;
    this.dailyMenuOrderItems.forEach((i: DailyMenuOrderItem) => {
      sum += i.price;
    });
    return sum;
  }

  filterAndGetNonActualDailyMenuItems(menu: DailyMenu): DailyMenuOrderItem[] {
    const nonActualItems: DailyMenuOrderItem[] = [];
    this.dailyMenuOrderItems = this.dailyMenuOrderItems.filter((orderItem: DailyMenuOrderItem) => {
      const availableMenuItemExists = menu.dailyMenuItems.some(
        (dailyMenuItem: DailyMenuItem) => dailyMenuItem.id === orderItem.dailyMenuItem.id && dailyMenuItem.available
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
