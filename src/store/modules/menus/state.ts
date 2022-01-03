import IMenu from '@/interfaces/IMenu';

export interface State {
  items: IMenu[];
  item: IMenu;
  itemsForDelete: string[];
}
