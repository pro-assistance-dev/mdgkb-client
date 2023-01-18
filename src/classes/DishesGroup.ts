import DishSample from '@/classes/DishSample';
import IDailyMenu from '@/interfaces/IDailyMenu';
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

  removeDishSample(id?: string): void {
    const index = this.dishSamples.findIndex((i: IDishSample) => i.id === id);
    if (index > -1) {
      this.dishSamples.splice(index, 1);
    }
  }

  updateDishSample(dishSample: IDishSample): void {
    const index = this.dishSamples.findIndex((i: IDishSample) => i.id === dishSample.id);
    if (index > -1) {
      this.dishSamples[index] = new DishSample(dishSample);
    }
  }

  getSamplesNotFromMenu(menu: IDailyMenu): IDishSample[] {
    return this.dishSamples.filter((ds: IDishSample) => {
      return !menu.dailyMenuItems.find((dmi: IDailyMenuItem) => dmi.dishSampleId === ds.id);
    });
  }

  samplesExists(): boolean {
    return this.dishSamples.length > 0;
  }

  upsertSample(dishSample: IDishSample): void {
    const existingSampleIndex = this.dishSamples.findIndex((d: IDishSample) => d.id === dishSample.id);
    if (existingSampleIndex > -1) {
      this.dishSamples[existingSampleIndex] = new DishSample(dishSample);
    } else {
      this.dishSamples.push(new DishSample(dishSample));
    }
  }

  containAvailableItems(): boolean {
    return this.dailyMenuItems.some((d: IDailyMenuItem) => d.available);
  }
  setAvailable(available: boolean): void {
    this.dailyMenuItems.forEach((d: IDailyMenuItem) => (d.available = available));
  }

  getDailyMenuItemsIds(): string[] {
    const ids: string[] = [];
    this.dailyMenuItems.forEach((dmi: IDailyMenuItem) => {
      if (dmi.id) {
        ids.push(dmi.id);
      }
    });
    return ids;
  }

  getAvailableDishes(): IDailyMenuItem[] {
    const items: IDailyMenuItem[] = [];
    this.dailyMenuItems.forEach((i: IDailyMenuItem) => {
      if (i.available) {
        items.push(i);
      }
    });
    return items;
  }

  getTransliteIdFromName(): string {
    return this.name.replace(' ', '');
  }
}
