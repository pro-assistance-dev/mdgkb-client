import IOption from '@/interfaces/schema/IOption';

export default interface ISchemaWithOptions {
  tableName: string;
  value: string;
  label: string;
  options: IOption[];
}
