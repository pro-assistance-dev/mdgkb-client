import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  divisions: [],
  division: undefined,
};

const namespaced = true;

export const divisions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
