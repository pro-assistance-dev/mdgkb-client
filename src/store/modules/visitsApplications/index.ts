import { Module } from 'vuex';

import VisitsApplication from '@/classes/VisitsApplication';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<VisitsApplication>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(VisitsApplication),
  };
};
const state = getDefaultState();
const namespaced = true;

export const visitsApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
