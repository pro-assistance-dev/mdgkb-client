import { Module } from 'vuex';

import PaidProgram from '@/classes/PaidProgram';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PaidProgram(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const paidPrograms: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
