import { v4 as uuidv4 } from 'uuid';

import DailyMenuItem from '@/classes/DailyMenuItem';
import DishesGroup from '@/classes/DishesGroup';
import DishSample from '@/classes/DishSample';
import ClassHelper from '@/services/ClassHelper';

export default class DailyMenu {
  id?: string;
  date = new Date();
  @ClassHelper.GetClassConstructor(DailyMenuItem)
  dailyMenuItems: DailyMenuItem[] = [];
  dailyMenuItemsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(DishesGroup)
  dishesGroups: DishesGroup[] = [];
  order = 0;
  name = '';
  active = false;
  editMode = false;
  cacheName = '';
  startTime?: string;
  endTime?: string;

  onlyDietary = false;
  onlyLean = false;
  onlyAvailable = false;

  constructor(i?: DailyMenu) {
    ClassHelper.BuildClass(this, i);
  }

  addDishesFromSamples(dishesSamples: DishSample[], groups: DishesGroup[]): void {
    dishesSamples.forEach((ds: DishSample) => {
      const item = DailyMenuItem.CreateFromSample(ds);
      console.log(item);
      item.dailyMenuId = this.id;
      item.highlight = true;
      this.dailyMenuItems.push(item);
      setTimeout(() => {
        item.highlight = false;
      }, 1000);
    });
    this.groupDishes(groups);
  }

  setNamesForGroups(groups: DishesGroup[]): void {
    this.dishesGroups.forEach((dg: DishesGroup) => {
      const g = groups.find((g: DishesGroup) => g.id === dg.id);
      dg.name = g ? g.name : dg.name;
    });
  }

  groupDishes(groups: DishesGroup[]): void {
    this.dishesGroups = [];
    this.dailyMenuItems.forEach((i: DailyMenuItem) => {
      const dishesGroup = this.dishesGroups.find((g: DishesGroup) => g.id === i.dishSample.dishesGroupId);
      if (dishesGroup) {
        dishesGroup.dailyMenuItems.push(i);
      } else {
        const group = new DishesGroup();
        group.id = i.dishSample.dishesGroupId;
        this.dishesGroups.push(group);
        group.dailyMenuItems.push(i);
      }
    });
    this.dishesGroups.sort((g1: DishesGroup, g2) => g1.order - g2.order);
    this.setNamesForGroups(groups);
  }

  removeMenuItems(ids: string[], groups: DishesGroup[]): void {
    this.dailyMenuItems = this.dailyMenuItems.filter((d: DailyMenuItem) => !ids.includes(d.id ?? ''));
    this.groupDishes(groups);
  }

  removeMenuItem(id: string, groups: DishesGroup[]): void {
    ClassHelper.RemoveFromClassById(id, this.dailyMenuItems, this.dailyMenuItemsForDelete);
    this.groupDishes(groups);
  }

  static Create(date: Date): DailyMenu {
    const menu = new DailyMenu();
    menu.id = uuidv4();
    menu.order = 0;
    menu.name = 'Новое меню';
    menu.date = date;
    return menu;
  }

  static CreateBreakfast(date: Date): DailyMenu {
    const menu = new DailyMenu();
    menu.id = uuidv4();
    menu.order = 0;
    menu.name = 'Завтрак';
    menu.date = date;
    return menu;
  }

  static CreateDinner(date: Date): DailyMenu {
    const menu = new DailyMenu();
    menu.id = uuidv4();
    menu.order = 1;
    menu.name = 'Обед';
    menu.date = date;
    return menu;
  }

  isActive(): boolean {
    return this.active;
  }

  setEditMode(): void {
    this.editMode = true;
    this.cacheName = this.name;
  }

  cancelEditMode(): void {
    this.editMode = false;
    this.name = this.cacheName;
  }

  fillGroups(dailyMenuItems: DailyMenuItem[]): void {
    this.dishesGroups.forEach((g: DishesGroup) => {
      g.dailyMenuItems = dailyMenuItems.filter((d: DailyMenuItem) => d.dishesGroupId === g.id);
    });
  }

  initGroups(): void {
    this.fillGroups(this.getFilteredDailyMenuItems());
  }

  setOnlyDietary(value: boolean): void {
    this.onlyDietary = value;
    this.initGroups();
  }

  setOnlyLean(value: boolean): void {
    this.onlyLean = value;
    this.initGroups();
  }

  getNotEmptyGroups(onlyWithAvailableDishes: boolean): DishesGroup[] {
    if (onlyWithAvailableDishes) {
      return this.dishesGroups.filter((d: DishesGroup) => d.getAvailableDishes().length);
    }
    return this.dishesGroups.filter((d: DishesGroup) => d.dailyMenuItems.length);
  }

  addActiveDishesFromOthersMenus(dailyMenus: DailyMenu[], groups: DishesGroup[]): void {
    dailyMenus.forEach((m: DailyMenu) => {
      if (!m) {
        return;
      }
      m.dailyMenuItems.forEach((dmi: DailyMenuItem) => {
        if (dmi.available) {
          const newMenuItem = new DailyMenuItem(dmi);
          newMenuItem.fromOtherMenu = true;
          this.dailyMenuItems.push(newMenuItem);
        }
      });
    });
    this.groupDishes(groups);
  }

  removeDailyMenuItemsFromOthersMenus(): void {
    this.dailyMenuItems = this.dailyMenuItems.filter((dmi: DailyMenuItem) => !dmi.fromOtherMenu);
  }

  availableDishesExists(): boolean {
    return this.dailyMenuItems.some((d: DailyMenuItem) => d.available);
  }

  getFilteredDailyMenuItems(): DailyMenuItem[] {
    return this.filterDietaryItems(this.filterLeanItems(this.filterAvailableItems(this.dailyMenuItems)));
  }

  filterAvailableItems(items: DailyMenuItem[]): DailyMenuItem[] {
    return this.onlyAvailable ? items.filter((d: DailyMenuItem) => d.available) : items;
  }

  filterDietaryItems(items: DailyMenuItem[]): DailyMenuItem[] {
    return this.onlyDietary ? items.filter((d: DailyMenuItem) => d.dietary) : items;
  }

  filterLeanItems(items: DailyMenuItem[]): DailyMenuItem[] {
    return this.onlyLean ? items.filter((d: DailyMenuItem) => d.lean) : items;
  }

  getDailyMenuItemById(id: string | undefined): DailyMenuItem | undefined {
    return this.dailyMenuItems.find((d: DailyMenuItem) => d.id === id);
  }

  actualize(actualMenu: DailyMenu): void {
    this.id = actualMenu.id;
    actualMenu.dailyMenuItems.forEach((d: DailyMenuItem) => {
      const findedDayilyMenuItem = this.getDailyMenuItemById(d.id);
      if (findedDayilyMenuItem) {
        findedDayilyMenuItem.available = d.available;
      } else {
        this.dailyMenuItems.push(d);
      }
    });

    this.dailyMenuItems.forEach((d: DailyMenuItem) => {
      if (!actualMenu.getDailyMenuItemById(d.id)) {
        ClassHelper.RemoveFromClassById(d.id, this.dailyMenuItems, []);
      }
    });
  }
}
