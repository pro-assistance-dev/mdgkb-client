import { GetterTree } from 'vuex';

import SearchGroup from '@/classes/SearchGroup';
import SearchModel from '@/services/classes/SearchModel';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  isSearchDrawerOpen(state): boolean {
    return state.isSearchDrawerOpen;
  },
  searchModel(state): SearchModel {
    return state.searchModel;
  },
  searchGroups(state): SearchGroup[] {
    return state.searchGroups;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
