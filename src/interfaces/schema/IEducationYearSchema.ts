import IOption from '@/interfaces/schema/IOption';

export default interface IEducationYearSchema {
  tableName: string;
  value: string;
  options: IOption[];
  year: string;
  active: string;
  sortColumn: string;
}
