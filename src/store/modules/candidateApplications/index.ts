import { Module } from 'vuex';

import CandidateApplication from '@/classes/CandidateApplication';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<CandidateApplication> {
  emailExists: boolean;
}
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(CandidateApplication),
    emailExists: false,
  };
};
const state = getDefaultState();
const namespaced = true;

export const candidateApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
