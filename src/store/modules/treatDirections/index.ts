import { Module } from 'vuex';

import TreatDirection from '@/classes/TreatDirection';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new TreatDirection(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const treatDirections: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
