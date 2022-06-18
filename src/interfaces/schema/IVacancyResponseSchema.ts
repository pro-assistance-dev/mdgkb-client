import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IVacancyResponseSchema extends IBaseSchema {
  title: string;
  date: string;
  formStatusId: string;
  email: string;
  fullName: string;
}
