import { Module } from 'vuex';

import Hospitalization from '@/classes/hospitalizations/Hospitalization';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Hospitalization>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Hospitalization),
  };
};
const state = getDefaultState();
const namespaced = true;

export const hospitalizations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
