import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IResidencyCourseSchema extends IBaseSchema {
  name: string;
  slug: string;
  hours: string;
  teacherId: string;
  listeners: string;
  paidPlaces: string;
  freePlaces: string;
  startYear: string;
  startYearId: string;
  endYear: string;
  endYearId: string;
  cost: string;
}
