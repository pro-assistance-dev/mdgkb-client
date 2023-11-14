import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IVacancyResponseSchema extends IBaseSchema {
  title: string;
  createdAt: string;
  formStatusId: string;
  email: string;
  fullName: string;
}
