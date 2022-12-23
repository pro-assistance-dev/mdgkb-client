import IDailyMenu from '@/interfaces/IDailyMenu';

export interface State {
  items: IDailyMenu[];
  periodItems: IDailyMenu[];
  item: IDailyMenu;
}
