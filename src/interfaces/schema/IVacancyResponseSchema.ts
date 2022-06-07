import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IVacancyResponseSchema extends IBaseSchema {
  title: string;
  date: string;
}
