import IDailyMenu from '@/interfaces/IDailyMenu';
import IDishSample from '@/interfaces/IDishSample';

export default interface IDailyMenuItem {
  id?: string;
  name: string;
  price: number;
  weight: number;
  caloric: number;
  dailyMenuId?: string;
  dailyMenu: IDailyMenu;

  dishSampleId?: string;
  dishSample: IDishSample;
}
