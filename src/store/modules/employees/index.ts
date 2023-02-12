import { Module } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Employee>;
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
