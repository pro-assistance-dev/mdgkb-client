import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface ISupportMessageSchema extends IBaseSchema {
  date: string;
  isNew: string;
  theme: string;
  question: string;
}
