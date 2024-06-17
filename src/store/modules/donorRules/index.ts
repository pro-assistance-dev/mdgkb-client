import { Module } from 'vuex';

import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import RootState from '@/store/types';

import DonorRule from '@/classes/DonorRule';

import IBasicState from '@/services/store/baseModule/baseState';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DonorRule>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DonorRule),
  };
};

const state = getDefaultState();
const namespaced = true;

export const donorRules: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
