import IDailyMenu from '@/interfaces/IDailyMenu';
import IDishSample from '@/interfaces/IDishSample';

export default interface IDailyMenuItem {
  id?: string;
  name: string;
  order: number;
  price: number;
  weight: number;
  caloric: number;
  dailyMenuId?: string;
  dailyMenu: IDailyMenu;
  available: boolean;
  dishSampleId?: string;
  dishSample: IDishSample;
  highlight: boolean;
  fromOtherMenu: boolean;
}
