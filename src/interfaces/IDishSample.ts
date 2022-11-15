import IDishesGroup from '@/interfaces/IDishesGroup';

export default interface IDishSample {
  id?: string;
  name: string;
  price: number;
  caloric: number;
  dishesGroupId?: string;
  dishesGroup: IDishesGroup;
}
