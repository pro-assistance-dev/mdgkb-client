import { Module } from 'vuex';

import Teacher from '@/classes/Teacher';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Teacher>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Teacher),
  };
};

const state = getDefaultState();
const namespaced = true;

export const teachers: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
