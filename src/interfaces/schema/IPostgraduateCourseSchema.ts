import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPostgraduateCourseSchema extends IBaseSchema {
  code: string;
  cost: string;
  name: string;
  years: string;
  education_form: string;
}
