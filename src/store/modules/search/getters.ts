import { GetterTree } from 'vuex';

import SearchModel from '@/classes/SearchModel';
import ISearchGroup from '@/interfaces/ISearchGroup';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  isSearchDrawerOpen(state): boolean {
    return state.isSearchDrawerOpen;
  },
  searchModel(state): SearchModel {
    return state.searchModel;
  },
  searchGroups(state): ISearchGroup[] {
    return state.searchGroups;
  },
};

export default getters;
