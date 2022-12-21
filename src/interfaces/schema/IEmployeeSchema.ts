import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IEmployeeSchema extends IBaseSchema {
  fullName: string;
  isMale: string;
  dateBirth: string;
}
