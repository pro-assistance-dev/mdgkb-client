import { Module } from 'vuex';

import Project from '@/classes/Project';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Project>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Project),
  };
};

const state = getDefaultState();
const namespaced = true;

export const projects: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
