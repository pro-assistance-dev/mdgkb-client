import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface INewsToTag extends IBaseSchema {
  newsId: string;
  tagId: string;
}
