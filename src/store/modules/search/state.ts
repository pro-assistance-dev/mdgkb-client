import SearchGroup from '@/classes/SearchGroup';
import SearchModel from '@/services/classes/SearchModel';

export default interface State {
  isSearchDrawerOpen: boolean;
  searchModel: SearchModel;
  searchGroups: SearchGroup[];
  count: number;
}
