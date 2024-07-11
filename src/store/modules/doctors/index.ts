import { Module } from 'vuex';

import Doctor from '@/classes/Doctor';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Doctor> {}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Doctor),
  };
};

const state = getDefaultState();
const namespaced = true;

export const doctors: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
