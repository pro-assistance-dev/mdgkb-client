import { Module } from 'vuex';

import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  buildingANumber: undefined,
  buildingBNumber: undefined,
  loading: false,
};

const namespaced = true;

export const map: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
