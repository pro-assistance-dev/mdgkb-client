import IOption from '@/interfaces/schema/IOption';

export default interface ICenterSchema {
  tableName: string;
  value: string;
  label: string;
  name: string;
  sortColumn: string;
  options: IOption[];
}
