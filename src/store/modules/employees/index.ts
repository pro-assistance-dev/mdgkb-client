import { Module } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Employee>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Employee),
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
