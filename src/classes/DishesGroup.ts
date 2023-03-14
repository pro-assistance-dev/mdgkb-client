import DailyMenu from '@/classes/DailyMenu';
import DailyMenuItem from '@/classes/DailyMenuItem';
import DishSample from '@/classes/DishSample';
import ClassHelper from '@/services/ClassHelper';

export default class DishesGroup {
  id?: string;
  name = '';
  order = 0;
  @ClassHelper.GetClassConstructor(DishSample)
  dishSamples: DishSample[] = [];
  @ClassHelper.GetClassConstructor(DailyMenuItem)
  dailyMenuItems: DailyMenuItem[] = [];
  constructor(i?: DishesGroup) {
    ClassHelper.BuildClass(this, i);
  }

  toggleSelectSample(id: string): void {
    const dishSample = this.dishSamples.find((item: DishSample) => item.id === id);
    if (!dishSample) {
      return;
    }
    dishSample.selected = !dishSample.selected;
  }

  removeDishSample(id?: string): void {
    const index = this.dishSamples.findIndex((i: DishSample) => i.id === id);
    if (index > -1) {
      this.dishSamples.splice(index, 1);
    }
  }

  updateDishSample(dishSample: DishSample): void {
    const index = this.dishSamples.findIndex((i: DishSample) => i.id === dishSample.id);
    if (index > -1) {
      this.dishSamples[index] = new DishSample(dishSample);
    }
  }

  getSamplesNotFromMenu(menu: DailyMenu): DishSample[] {
    return this.dishSamples.filter((ds: DishSample) => {
      return !menu.dailyMenuItems.find((dmi: DailyMenuItem) => dmi.dishSampleId === ds.id);
    });
  }

  samplesExists(): boolean {
    return this.dishSamples.length > 0;
  }

  upsertSample(dishSample: DishSample): void {
    const existingSampleIndex = this.dishSamples.findIndex((d: DishSample) => d.id === dishSample.id);
    if (existingSampleIndex > -1) {
      this.dishSamples[existingSampleIndex] = new DishSample(dishSample);
    } else {
      this.dishSamples.push(new DishSample(dishSample));
    }
  }

  containAvailableItems(): boolean {
    return this.dailyMenuItems.some((d: DailyMenuItem) => d.available);
  }
  setAvailable(available: boolean): void {
    this.dailyMenuItems.forEach((d: DailyMenuItem) => (d.available = available));
  }

  getDailyMenuItemsIds(): string[] {
    const ids: string[] = [];
    this.dailyMenuItems.forEach((dmi: DailyMenuItem) => {
      if (dmi.id) {
        ids.push(dmi.id);
      }
    });
    return ids;
  }

  getAvailableDishes(): DailyMenuItem[] {
    const items: DailyMenuItem[] = [];
    this.dailyMenuItems.forEach((i: DailyMenuItem) => {
      if (i.available) {
        items.push(i);
      }
    });
    return items;
  }

  getTransliteIdFromName(): string {
    return this.name.replace(/\s+/g, '');
  }
}
