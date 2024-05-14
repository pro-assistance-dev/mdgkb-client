import { Module } from 'vuex';

import Vacancy from '@/classes/Vacancy';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Vacancy>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Vacancy),
  };
};

const state = getDefaultState();
const namespaced = true;

export const vacancies: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
