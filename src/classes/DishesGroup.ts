import DishSample from '@/classes/DishSample';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';

export default class DishesGroup implements IDishesGroup {
  id?: string;
  name = '';
  order = 0;
  dailyMenuItems: IDailyMenuItem[] = [];
  dishSamples: IDishSample[] = [];
  constructor(i?: IDishesGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    if (i.dishSamples) {
      this.dishSamples = i.dishSamples.map((item: IDishSample) => new DishSample(item));
    }
  }

  toggleSelectSample(id: string): void {
    const dishSample = this.dishSamples.find((item: IDishSample) => item.id === id);
    if (!dishSample) {
      return;
    }
    dishSample.selected = !dishSample.selected;
  }
}