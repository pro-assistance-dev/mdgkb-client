import { Module } from 'vuex';

import ResidencyCourse from '@/classes/ResidencyCourse';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<ResidencyCourse>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(ResidencyCourse),
  };
};

const state = getDefaultState();
const namespaced = true;

export const residencyCourses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
