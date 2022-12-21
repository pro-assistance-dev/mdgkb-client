import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDailyMenuSchema extends IBaseSchema {
  name: string;
  order: string;
  date: string;
}
