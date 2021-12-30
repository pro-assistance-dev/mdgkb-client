import IPreparation from '@/interfaces/IPreparation';

export interface State {
  items: IPreparation[];
  itemsForDelete: string[];
  item: IPreparation;
}
