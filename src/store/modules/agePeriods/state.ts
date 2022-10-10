import IAgePeriod from '@/interfaces/IAgePeriod';

export interface State {
  items: IAgePeriod[];
  item: IAgePeriod;
  selectedItemId: string;
}
