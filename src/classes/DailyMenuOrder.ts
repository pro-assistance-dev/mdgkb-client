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
  number?: number;
  @ClassHelper.GetClassConstructor(DailyMenuOrderItem)
  dailyMenuOrderItems: DailyMenuOrderItem[] = [];
  dailyMenuOrderItemsForDelete: string[] = [];
  formValue: Form = new Form();
  formValueId?: string;
  formStatusId?: string;
  chatIsOpen = false;
  //
  isNew = false;
  createdAt = '';
  constructor(i?: DailyMenuOrder) {
    ClassHelper.BuildClass(this, i);
  }

  findDailyMenuOrderItemById(id: string | undefined): DailyMenuOrderItem | undefined {
    return this.dailyMenuOrderItems.find((d: DailyMenuOrderItem) => d.dailyMenuItemId === id);
  }

  private addToDailyMenuItems(dailyMenuItem: DailyMenuItem): void {
    const existingItem = this.findDailyMenuOrderItemById(dailyMenuItem.id);
    if (existingItem) {
      existingItem.increment();
    } else {
      this.dailyMenuOrderItems.push(DailyMenuOrderItem.Create(dailyMenuItem));
    }
  }

  public changeDailyMenuOrderItemQuantity(curNum: number, prevNum: number, dailyMenuItem: DailyMenuItem): void {
    if (curNum > prevNum) {
      this.increaseDailyMenuOrderItem(dailyMenuItem);
    } else {
      this.decreaseDailyMenuOrderItem(dailyMenuItem);
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
    const existingItemInxex = this.dailyMenuOrderItems.findIndex((d: DailyMenuOrderItem) => d.dailyMenuItemId === dailyMenuItem.id);
    if (existingItemInxex < 0) {
      return;
    }
    if (this.dailyMenuOrderItems[existingItemInxex].quantity > 1) {
      this.dailyMenuOrderItems[existingItemInxex].decrement();
    } else {
      ClassHelper.RemoveFromClassByIndex(existingItemInxex, this.dailyMenuOrderItems, this.dailyMenuOrderItemsForDelete);
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
      sum += i.getPriceSum();
    });
    return sum;
  }

  filterAndGetNonActualDailyMenuItems(menu: DailyMenu): DailyMenuOrderItem[] {
    const nonActualItems: DailyMenuOrderItem[] = [];
    this.dailyMenuOrderItems = this.dailyMenuOrderItems.filter((orderItem: DailyMenuOrderItem) => {
      const availableMenuItemExists = menu.dailyMenuItems.some(
        (dailyMenuItem: DailyMenuItem) => dailyMenuItem.id === orderItem.dailyMenuItemId && dailyMenuItem.available
      );
      if (!availableMenuItemExists) {
        nonActualItems.push(orderItem);
      }
      return availableMenuItemExists;
    });
    this.setLocalStorage();
    return nonActualItems;
  }

  getFormattedNumber(): string {
    return `Заказ №${this.number}`;
  }

  getDailyMenuItemsQuantity(): number {
    let sum = 0;
    this.dailyMenuOrderItems.forEach((d: DailyMenuOrderItem) => (sum += d.quantity));
    return sum;
  }

  isEmpty(): boolean {
    return this.dailyMenuOrderItems.length === 0;
  }

  clear(): void {
    this.dailyMenuOrderItems = [];
    this.removeFromLocalStore();
  }

  static GetClassName(): string {
    return 'dailyMenuItem';
  }
}
