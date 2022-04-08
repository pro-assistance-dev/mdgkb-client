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
  value: string;
  label: string;
  sortColumn: string;
}
