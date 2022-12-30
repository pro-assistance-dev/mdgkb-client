import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDishesGroupSchema extends IBaseSchema {
  name: string;
  order: string;
}
