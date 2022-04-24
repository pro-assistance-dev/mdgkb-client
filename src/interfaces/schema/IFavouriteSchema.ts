import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPatientSchema extends IBaseSchema {
  createdAt: string;
  updatedAt: string;
}
