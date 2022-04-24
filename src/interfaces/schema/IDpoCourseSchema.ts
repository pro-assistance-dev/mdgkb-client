import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDpoCourseSchema extends IBaseSchema {
  name: string;
  slug: string;
  cost: string;
  isNmo: string;
  specializationId: string;
  hours: string;
  teacherId: string;
  listeners: string;
  start: string;
  minStart: string;
  minEnd: string;
}
