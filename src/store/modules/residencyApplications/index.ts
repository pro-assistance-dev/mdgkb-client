import { Module } from 'vuex';

import ResidencyApplication from '@/classes/ResidencyApplication';
import Page from '@/services/classes/Page';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<ResidencyApplication> {
  emailExists: boolean;
  typeExists: boolean;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(ResidencyApplication),
    emailExists: false,
    typeExists: false,
  };
};
const state = getDefaultState();
const namespaced = true;

export const residencyApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
