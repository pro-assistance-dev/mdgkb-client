import { Module } from 'vuex';

import DpoCourse from '@/classes/DpoCourse';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DpoCourse(),
  };
};

const state = getDefaultState();
console.log(state);
const namespaced = true;

export const dpoCourses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
