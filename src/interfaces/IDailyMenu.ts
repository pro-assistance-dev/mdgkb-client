import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDishesGroup from '@/interfaces/IDishesGroup';
import IDishSample from '@/interfaces/IDishSample';

export default interface IDailyMenu {
  id?: string;
  date: Date;
  dailyMenuItems: IDailyMenuItem[];
  addDishesFromSamples: (dishesSamples: IDishSample[]) => void;
  dishesGroups: IDishesGroup[];
  groupDishes: () => void;
  dailyMenuItemsForDelete: string[];
  removeMenuItem: (index: string) => void;
}
