import { Module } from 'vuex';

import Question from '@/classes/Question';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Question> {
  question: Question;
  allLoaded: boolean;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Question),
    question: new Question(),
    allLoaded: false,
  };
};

const state = getDefaultState();
const namespaced = true;

export const questions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
