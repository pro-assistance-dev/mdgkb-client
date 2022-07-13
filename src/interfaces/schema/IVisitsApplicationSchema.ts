import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IVisitsApplicationSchema extends IBaseSchema {
  createdAt: string;
  formStatusId: string;
  email: string;
  childFullName: string;
  gateName: string;
  divisionName: string;
  withCar: string;
}
