import ISearchElement from '@/interfaces/ISearchElement';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchObject from '@/interfaces/ISearchObject';

export default interface ISearchModel {
  query: string;
  params: string;
  suggester: boolean;
  mustBeTranslated: boolean;
  options: ISearchElement[];
  searchGroupId: string;
  searchGroups: ISearchGroup[];
  searchGroup: ISearchGroup;
  searchObjects: ISearchObject[];
  toUrl: () => string;

  setSearchGroup: (groupId: string | undefined) => void;
}
