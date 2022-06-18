import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPostgraduateApplicationSchema extends IBaseSchema {
  createdAt: string;
  formStatusId: string;
  email: string;
  fullName: string;
  courseName: string;
}
