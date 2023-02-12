import { Module } from 'vuex';

import DpoCourse from '@/classes/DpoCourse';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DpoCourse>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DpoCourse),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dpoCourses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
