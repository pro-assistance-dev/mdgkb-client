import { Module } from 'vuex';

import CandidateExam from '@/classes/CandidateExam';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<CandidateExam>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(CandidateExam),
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
