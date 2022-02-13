import IOption from '@/interfaces/schema/IOption';

export default interface IMedicalProfileSchema {
  tableName: string;
  value: string;
  label: string;
  sortColumn: string;
  options: IOption[];
}
