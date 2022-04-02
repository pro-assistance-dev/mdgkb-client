import IMenu from '@/interfaces/IMenu';

export interface State {
  items: IMenu[];
  menus: IMenu[];
  item: IMenu;
  itemsForDelete: string[];
}
