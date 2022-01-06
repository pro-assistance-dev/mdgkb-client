import { Module } from 'vuex';

import DonorRulesWithDeleted from '@/classes/DonorRulesWithDeleted';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: new DonorRulesWithDeleted(),
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
