import { MutationTree } from 'vuex';

import SearchGroup from '@/classes/SearchGroup';
import SearchModel from '@/services/classes/SearchModel';

import State from './state';

const mutations: MutationTree<State> = {
  toggleDrawer(state, isOpen: boolean) {
    state.isSearchDrawerOpen = isOpen;
    state.searchModel = new SearchModel();
  },
  setSearchModel(state, searchModel: SearchModel): void {
    state.searchModel = new SearchModel(searchModel);
  },
  setSearchGroups(state, searchGroups: SearchGroup[]): void {
    state.searchModel.searchGroups = searchGroups.map((item: SearchGroup) => new SearchGroup(item));
  },
};

export default mutations;
