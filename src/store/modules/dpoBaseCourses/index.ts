import { Module } from 'vuex';

import DpoBaseCourse from '@/classes/DpoBaseCourse';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DpoBaseCourse(),
  };
};

const state = getDefaultState();
console.log(state);
const namespaced = true;

export const dpoBaseCourses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
