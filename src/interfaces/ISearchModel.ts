import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchObject from '@/interfaces/ISearchObject';

export default interface ISearchModel {
  query: string;
  params: string;
  searchGroupId: string;
  searchGroups: ISearchGroup[];
  searchGroup: ISearchGroup;
  searchObjects: ISearchObject[];
  toUrl: () => string;
}
