import { Module } from 'vuex';

import Center from '@/classes/Center';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Center(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const centers: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
