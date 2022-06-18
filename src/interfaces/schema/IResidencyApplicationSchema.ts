import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IResidencyApplicationSchema extends IBaseSchema {
  createdAt: string;
  formStatusId: string;
  email: string;
  fullName: string;
}
