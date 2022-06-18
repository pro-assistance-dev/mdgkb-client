import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IApplicationCarSchema extends IBaseSchema {
  createdAt: string;
  formStatusId: string;
  email: string;
  childFullName: string;
  gateName: string;
  divisionName: string;
}
