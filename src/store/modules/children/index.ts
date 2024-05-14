import { Module } from 'vuex';

import Child from '@/classes/Child';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Child>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Child),
  };
};

const state = getDefaultState();
const namespaced = true;

export const children: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
