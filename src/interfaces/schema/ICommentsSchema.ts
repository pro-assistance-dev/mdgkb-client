import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface ICommentsSchema extends IBaseSchema {
  publishedOn: string;
  positive: string;
  modChecked: string;
  rating: string;
  userId: string;
}
