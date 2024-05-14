import { Module } from 'vuex';

import Form from '@/classes/Form';
import RootState from '@/store/types';

import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Form> { }

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Form),
  };
};

const state = getDefaultState();
const namespaced = true;

export const formPatterns: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
