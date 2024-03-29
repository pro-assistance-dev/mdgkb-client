import { Module } from 'vuex';

import Contact from '@/services/classes/Contact';
import RootState from '@/services/interfaces/types';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Contact>;

export const state = (): State => {
  return {
    ...getBaseDefaultState(Contact),
  };
};

const namespaced = true;

export const contacts: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
