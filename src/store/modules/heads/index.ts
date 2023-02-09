import { Module } from 'vuex';

import Head from '@/classes/Head';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Head>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Head),
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
