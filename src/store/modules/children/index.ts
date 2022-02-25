import { Module } from 'vuex';

import Child from '@/classes/Child';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Child(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const children: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
