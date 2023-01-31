import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface ITeacherSchema extends IBaseSchema {
  fullName: string;
  isMale: string;
  dateBirth: string;
}
