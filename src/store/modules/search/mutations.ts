import { MutationTree } from 'vuex';

import SearchGroup from '@/classes/SearchGroup';
import SearchModel from '@/classes/SearchModel';
import ISearchGroup from '@/interfaces/ISearchGroup';

import State from './state';

const mutations: MutationTree<State> = {
  toggleDrawer(state, isOpen: boolean) {
    state.isSearchDrawerOpen = isOpen;
    state.searchModel = new SearchModel();
  },
  setSearchModel(state, searchModel: SearchModel): void {
    state.searchModel = new SearchModel(searchModel);
  },
  setSearchGroups(state, searchGroups: ISearchGroup[]): void {
    state.searchModel.searchGroups = searchGroups.map((item: ISearchGroup) => new SearchGroup(item));
  },
};

export default mutations;
