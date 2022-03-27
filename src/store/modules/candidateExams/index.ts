import { Module } from 'vuex';

import CandidateExam from '@/classes/CandidateExam';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new CandidateExam(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const candidateExams: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
