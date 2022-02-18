import ISearchElement from '@/interfaces/ISearchElement';

export default interface ISearchGroup {
  id?: string;
  key: string;
  label: string;
  order: number;
  route: string;
  table: string;
  searchColumn: string;
  labelColumn: string;
  valueColumn: string;

  options: ISearchElement[];
}
