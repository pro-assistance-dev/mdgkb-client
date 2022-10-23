import IDietAge from '@/interfaces/IDietAge';

export interface State {
  items: IDietAge[];
  item: IDietAge;
  selectedItemId: string;
}
