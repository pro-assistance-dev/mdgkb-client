import { Module } from 'vuex';

import PaidService from '@/classes/PaidService';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PaidService(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const paidServices: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
