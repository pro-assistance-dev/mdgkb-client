import { Module } from 'vuex';

import VacancyResponse from '@/classes/VacancyResponse';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new VacancyResponse(),
    emailExists: false,
  };
};

const state = getDefaultState();
const namespaced = true;

export const vacancyResponses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
