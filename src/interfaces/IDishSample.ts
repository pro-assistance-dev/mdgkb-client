import IDishesGroup from '@/interfaces/IDishesGroup';

export default interface IDishSample {
  id?: string;
  name: string;
  price: number;
  weight: number;
  caloric: number;
  dishesGroupId?: string;
  dishesGroup: IDishesGroup;
  selected: boolean;
}
