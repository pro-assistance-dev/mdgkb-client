import { Module } from 'vuex';

import TreatDirection from '@/classes/TreatDirection';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<TreatDirection>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(TreatDirection),
  };
};

const state = getDefaultState();
const namespaced = true;

export const treatDirections: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
