import { Module } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state = (): State => {
  return {
    ...getBaseDefaultState(Employee),
  };
};

const namespaced = true;

export const employees: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
