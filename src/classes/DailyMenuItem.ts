import { v4 as uuidv4 } from 'uuid';

import DailyMenu from '@/classes/DailyMenu';
import DishSample from '@/classes/DishSample';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDishSample from '@/interfaces/IDishSample';

export default class DailyMenuItem implements IDailyMenuItem {
  id?: string;
  name = '';
  price = 0;
  quantity = 0;
  additionalWeight = 0;
  weight = 0;
  caloric = 0;
  order = 0;
  dailyMenuId?: string;
  dailyMenu: IDailyMenu = new DailyMenu();
  available = false;
  dishSampleId?: string;
  dishSample: IDishSample = new DishSample();
  highlight = false;

  fromOtherMenu = false;
  constructor(i?: IDailyMenuItem) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.price = i.price;
    this.order = i.order;
    this.caloric = i.caloric;
    this.weight = i.weight;
    this.dailyMenuId = i.dailyMenuId;
    this.available = i.available;
    this.quantity = i.quantity;
    this.additionalWeight = i.additionalWeight;
    this.highlight = i.highlight;
    if (i.dailyMenu) {
      this.dailyMenu = new DailyMenu(i.dailyMenu);
    }

    this.dishSampleId = i.dishSampleId;
    if (i.dishSample) {
      this.dishSample = new DishSample(i.dishSample);
    }
    this.fromOtherMenu = i.fromOtherMenu;
  }

  static CreateFromSample(dishSample: IDishSample): IDailyMenuItem {
    const item = new DailyMenuItem();
    item.id = uuidv4();
    item.dishSampleId = dishSample.id;
    item.name = dishSample.name;
    item.weight = dishSample.weight;
    item.caloric = dishSample.caloric;
    item.order = dishSample.order;
    item.quantity = dishSample.quantity;
    item.price = dishSample.price;
    item.dishSample = new DishSample(dishSample);
    return item;
  }
}
