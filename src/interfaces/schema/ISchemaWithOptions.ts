import IBaseSchema from '@/interfaces/schema/IBaseSchema';
import IOption from '@/interfaces/schema/IOption';

export default interface ISchemaWithOptions extends IBaseSchema {
  label: string;
  sortColumn: string;
  options: IOption[];
}
