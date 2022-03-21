import ISearchElement from '@/interfaces/ISearchElement';
import ISearchGroupMetaColumn from '@/interfaces/ISearchGroupMetaColumn';

export default interface ISearchGroup {
  id?: string;
  key: string;
  label: string;
  order: number;
  route: string;
  table: string;
  active: boolean;
  searchColumn: string;
  labelColumn: string;
  valueColumn: string;
  descriptionColumn: string;

  options: ISearchElement[];
  searchGroupMetaColumns: ISearchGroupMetaColumn[];
}
