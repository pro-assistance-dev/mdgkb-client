import { Module } from 'vuex';

import Gate from '@/classes/Gate';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Gate>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Gate),
  };
};

const state = getDefaultState();
const namespaced = true;

export const gates: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
