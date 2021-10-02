import { Module } from 'vuex';

import Page from '@/classes/page/Page';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    pages: [],
    page: new Page(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const pages: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
