import { Module } from 'vuex';

import Phone from '@/services/classes/Phone';
import RootState from '@/services/interfaces/types';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Phone>;

export const state = (): State => {
  return {
    ...getBaseDefaultState(Phone),
  };
};

const namespaced = true;

export const phones: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
