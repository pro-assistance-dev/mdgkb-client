import { v4 as uuidv4 } from 'uuid';

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

  composition = '';
  description = '';

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

  getFormattedEnergy(energyNumbers: number): string {
    return `${energyNumbers > 0 ? energyNumbers : '-'} гр.`;
  }

  getEnergies(): Record<string, string> {
    return {
      Белки: this.getFormattedEnergy(this.proteins),
      Жиры: this.getFormattedEnergy(this.fats),
      Углеводы: this.getFormattedEnergy(this.carbohydrates),
    };
  }

  getComposition(): string {
    const defaultComposition =
      'Все блюда приготовлены из натуральных и свежих продуктов. Более подробную информацию о составе этого блюда вы можете получить в нашем буфете';
    return this.composition.length ? this.composition : defaultComposition;
  }

  getDescription(): string {
    const defaultDescriptions = [
      'Данное блюдо неизменно пользуется спросом у наших посетителей',
      'Одно из лучших блюд нашего буфета',
      'Наиболее часто пользуется спросом',
      'Выбор наших посетителей',
      'Вседа самое свежее',
    ];
    const randNum = Math.floor(Math.random() * defaultDescriptions.length);
    return this.description.length ? this.description : defaultDescriptions[randNum];
  }
}
