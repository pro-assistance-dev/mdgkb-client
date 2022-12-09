import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import IDishSample from '@/interfaces/IDishSample';

export default interface IDishesGroup {
  id?: string;
  name: string;
  order: number;
  dailyMenuItems: IDailyMenuItem[];
  dishSamples: IDishSample[];

  toggleSelectSample: (id: string) => void;
  removeDishSample: (id: string) => void;
  updateDishSample: (dishSample: IDishSample) => void;
  getSamplesNotFromMenu: (menu: IDailyMenu) => IDishSample[];
}
