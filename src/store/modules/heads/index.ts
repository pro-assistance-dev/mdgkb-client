import { Module } from 'vuex';

import Head from '@/classes/Head';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Head(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const heads: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
