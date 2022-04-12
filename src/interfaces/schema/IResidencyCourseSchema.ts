import IOption from '@/interfaces/schema/IOption';

export default interface IResidencyCourseSchema {
  tableName: string;
  key: string;
  id: string;
  name: string;
  slug: string;
  hours: string;
  teacherId: string;
  listeners: string;
  options: IOption[];
  paidPlaces: string;
  freePlaces: string;
  startYear: string;
  startYearId: string;
  endYear: string;
  endYearId: string;
  cost: string;
  value: string;
  label: string;
  sortColumn: string;
}
