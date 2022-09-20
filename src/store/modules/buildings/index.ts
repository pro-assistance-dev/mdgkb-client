import { Module } from 'vuex';

import Building from '@/classes/Building';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  buildings: [],
  building: new Building(),
};

const namespaced = true;

export const buildings: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
