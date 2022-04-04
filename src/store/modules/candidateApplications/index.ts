import { Module } from 'vuex';

import CandidateApplication from '@/classes/CandidateApplication';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new CandidateApplication(),
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
