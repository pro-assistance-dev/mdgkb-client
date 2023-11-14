import { Module } from 'vuex';

import VacancyResponse from '@/classes/VacancyResponse';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<VacancyResponse> {
  emailExists: boolean;
  count: number;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(VacancyResponse),
    emailExists: false,
    count: 0,
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
