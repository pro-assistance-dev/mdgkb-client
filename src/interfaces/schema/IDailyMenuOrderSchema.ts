import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDailyMenuOrderSchema extends IBaseSchema {
  createdAt: string;
  approvingDate: string;
  formStatusId: string;
  email: string;
  boxNumber: string;
  fullName: string;
  number: string;
  formValueId: string;
  date: string;
}
