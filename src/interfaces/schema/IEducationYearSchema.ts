import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IEducationYearSchema extends IBaseSchema {
  year: string;
  active: string;
}
