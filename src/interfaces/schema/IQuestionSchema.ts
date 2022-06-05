import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IQuestionSchema extends IBaseSchema {
  date: string;
  published: string;
  answered: string;
  isNew: string;
  answerIsRead: string;
  theme: string;
}
