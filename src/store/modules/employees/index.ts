import { Module } from 'vuex';

import Employee from '@/classes/Employee';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Employee(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const employees: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
