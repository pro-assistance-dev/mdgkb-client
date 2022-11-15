import DailyMenuItem from '@/classes/DailyMenuItem';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';

export default class DailyMenu implements IDailyMenu {
  id?: string;
  date = new Date();
  dailyMenuItems: IDailyMenuItem[] = [];

  constructor(i?: IDailyMenu) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.date) {
      this.date = new Date(i.date);
    }
    if (i.dailyMenuItems) {
      this.dailyMenuItems = i.dailyMenuItems.map((item: IDailyMenuItem) => new DailyMenuItem(item));
    }
  }
}
