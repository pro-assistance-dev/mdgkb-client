import IPreparation from '@/interfaces/IPreparation';
import IPreparationTag from '@/interfaces/IPreparationTag';

export interface State {
  items: IPreparation[];
  itemsForDelete: string[];
  item: IPreparation;
  tags: IPreparationTag[];
}
