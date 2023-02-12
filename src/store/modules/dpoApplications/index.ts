import { Module } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<DpoApplication> {
  emailExists: boolean;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DpoApplication),
    emailExists: false,
  };
};
const state = getDefaultState();
const namespaced = true;

export const dpoApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
