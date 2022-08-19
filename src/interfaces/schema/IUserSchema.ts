import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IUserSchema extends IBaseSchema {
  email: string;
  fullName: string;
}
