import { Module } from 'vuex';

import FilterQuery from '@/services/classes/filters/FilterQuery';
import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  trigger: 'click',
  storeModule: '',
  action: 'getAll',
  filterQuery: new FilterQuery(),
  sortModels: [],
  setDefaultSortModel: false,
};

const namespaced = true;

export const filter: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
