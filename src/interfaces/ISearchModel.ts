import ISearchGroup from '@/interfaces/ISearchGroup';

export default interface ISearchModel {
  query: string;
  searchGroupId: string;
  searchGroups: ISearchGroup[];

  toUrl: () => string;
}
