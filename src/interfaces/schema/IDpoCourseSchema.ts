import IOption from '@/interfaces/schema/IOption';

export default interface IDpoCourseSchema {
  tableName: string;
  key: string;
  id: string;
  name: string;
  isNmo: string;
  specializationId: string;
  hours: string;
  teacherId: string;
  listeners: string;
  start: string;
  options: IOption[];
  value: string;
  label: string;
  sortColumn: string;
}
