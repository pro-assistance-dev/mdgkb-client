import { Module } from 'vuex';

import Diet from '@/classes/Diet';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Diet>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Diet),
  };
};

const state = getDefaultState();
const namespaced = true;

export const diets: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
