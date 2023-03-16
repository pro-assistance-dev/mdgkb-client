import { v4 as uuidv4 } from 'uuid';

import DishesGroup from '@/classes/DishesGroup';
import DishSample from '@/classes/DishSample';
import ClassHelper from '@/services/ClassHelper';

export default class DailyMenuItem {
  id?: string;
  name = '';
  price = 0;
  quantity = 0;
  additionalWeight = 0;
  weight = 0;
  caloric = 0;
  order = 0;
  dailyMenuId?: string;
  dishesGroupId?: string;
  // @ClassHelper.GetClassConstructor(DishesGroup)
  // dishesGroup?: undefined;
  available = false;
  dishSampleId?: string;
  dishSample: DishSample = new DishSample();
  highlight = false;

  fromOtherMenu = false;
  cook = false;
  tomorrowAvailable = false;
  proteins = 0;
  fats = 0;
  carbohydrates = 0;
  dietary = false;
  lean = false;

  constructor(i?: DailyMenuItem) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateFromSample(dishSample: DishSample): DailyMenuItem {
    const item = new DailyMenuItem();
    item.id = uuidv4();
    item.dishSampleId = dishSample.id;
    item.dishesGroupId = dishSample.dishesGroupId;
    item.name = dishSample.name;
    item.weight = dishSample.weight;
    item.caloric = dishSample.caloric;
    item.order = dishSample.order;
    item.quantity = dishSample.quantity;
    item.price = dishSample.price;
    item.dietary = dishSample.dietary;
    item.lean = dishSample.lean;
    item.proteins = dishSample.proteins;
    item.fats = dishSample.fats;
    item.carbohydrates = dishSample.carbohydrates;
    item.dishSample = new DishSample(dishSample);
    return item;
  }
}
