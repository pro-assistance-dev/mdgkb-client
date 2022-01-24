import { Module } from 'vuex';

import Question from '@/classes/Question';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Question(),
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
