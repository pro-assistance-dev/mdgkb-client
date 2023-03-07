import { Module } from 'vuex';

import Project from '@/classes/Project';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Project(),
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
