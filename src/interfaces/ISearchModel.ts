import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchObject from '@/interfaces/ISearchObject';
import { SearchModes } from '@/interfaces/SearchModes';

export default interface ISearchModel {
  query: string;
  params: string;
  searchGroupId: string;
  searchGroups: ISearchGroup[];
  searchGroup: ISearchGroup;
  searchObjects: ISearchObject[];
  searchMode: SearchModes;
  toUrl: () => string;
}
