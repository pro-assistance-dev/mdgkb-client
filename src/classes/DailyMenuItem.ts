import DailyMenu from '@/classes/DailyMenu';
import DishSample from '@/classes/DishSample';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDishSample from '@/interfaces/IDishSample';

export default class DailyMenuItem implements IDailyMenuItem {
  id?: string;
  name = '';
  price = 0;
  caloric = 0;
  dailyMenuId?: string;
  dailyMenu: IDailyMenu = new DailyMenu();

  dishSampleId?: string;
  dishSample: IDishSample = new DishSample();

  constructor(i?: IDailyMenuItem) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.price = i.price;
    this.caloric = i.caloric;
    this.dailyMenuId = i.dailyMenuId;
    if (i.dailyMenu) {
      this.dailyMenu = new DailyMenu(i.dailyMenu);
    }

    this.dishSampleId = i.dishSampleId;
    if (i.dishSample) {
      this.dishSample = new DishSample(i.dishSample);
    }
  }
}
