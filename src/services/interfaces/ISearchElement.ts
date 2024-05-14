import ISearchElementMeta from '@/interfaces/ISearchElementMeta';
import ISearchGroup from '@/interfaces/ISearchGroup';

export default interface ISearchElement {
  label: string;
  value: string;
  description: string;
  route: string;
  searchGroup: ISearchGroup;
  searchElementMetas: ISearchElementMeta[];
}
