import SearchModel from '@/classes/SearchModel';
import ISearchGroup from '@/interfaces/ISearchGroup';

export default interface State {
  isSearchDrawerOpen: boolean;
  searchModel: SearchModel;
  searchGroups: ISearchGroup[];
  count: number;
}
