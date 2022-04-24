import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IHumanSchema extends IBaseSchema {
  dateBirth: string;
  isMale: string;
  fullName: string;
}
