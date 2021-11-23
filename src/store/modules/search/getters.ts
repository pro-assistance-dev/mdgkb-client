import { GetterTree } from 'vuex';

import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  isSearchDrawerOpen(state): boolean {
    return state.isSearchDrawerOpen;
  },
  searchModel(state): ISearchModel {
    return state.searchModel;
  },
  searchGroups(state): ISearchGroup[] {
    return state.searchGroups;
  },
};

export default getters;
