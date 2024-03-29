import { Module } from 'vuex';

import Email from '@/services/classes/Email';
import RootState from '@/services/interfaces/types';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Email>;

export const state = (): State => {
  return {
    ...getBaseDefaultState(Email),
  };
};

const namespaced = true;

export const emails: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
