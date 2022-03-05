import { Module } from 'vuex';

import Gate from '@/classes/Gate';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Gate(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const gates: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
