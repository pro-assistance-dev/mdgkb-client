import { Module } from 'vuex';

import NmoCourse from '@/classes/NmoCourse';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<NmoCourse>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(NmoCourse),
  };
};

const state = getDefaultState();
const namespaced = true;

export const nmoCourses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
