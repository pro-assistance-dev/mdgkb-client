import IOption from '@/interfaces/schema/IOption';

export default interface ISpecializationSchema {
  tableName: string;
  key: string;
  id: string;
  name: string;
  value: string;
  label: string;
  sortColumn: string;
  options: IOption[];
}
