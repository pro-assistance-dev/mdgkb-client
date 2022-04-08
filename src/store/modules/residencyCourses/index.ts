import { Module } from 'vuex';

import ResidencyCourse from '@/classes/ResidencyCourse';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new ResidencyCourse(),
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
