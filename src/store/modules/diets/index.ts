import { Module } from 'vuex';

import Diet from '@/classes/Diet';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Diet(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const diets: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
