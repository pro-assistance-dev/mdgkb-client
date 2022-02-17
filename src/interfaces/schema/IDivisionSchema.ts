import IOption from '@/interfaces/schema/IOption';

export default interface IDivisionSchema {
  tableName: string;
  value: string;
  ket: string;
  hospitalizationContactInfoId: string;
  label: string;
  name: string;
  sortColumn: string;
  options: IOption[];
}
