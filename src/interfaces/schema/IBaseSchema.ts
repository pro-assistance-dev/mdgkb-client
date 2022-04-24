import IOption from '@/interfaces/schema/IOption';

export default interface IBaseSchema {
  tableName: string;
  sortColumn: string;
  key: string;
  options: IOption[];
  id: string;
  label: string;
  value: string;
}
