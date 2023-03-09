import { Module } from 'vuex';

import SearchModel from '@/services/classes/SearchModel';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

export const state: State = {
  isSearchDrawerOpen: false,
  searchModel: new SearchModel(),
  searchGroups: [],
  count: 0,
};

const namespaced = true;

const search: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default search;
