import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';

export default interface State {
  isSearchDrawerOpen: boolean;
  searchModel: ISearchModel;
  searchGroups: ISearchGroup[];
}
