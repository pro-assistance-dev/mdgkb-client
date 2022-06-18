import { Module } from 'vuex';

import ResidencyApplication from '@/classes/ResidencyApplication';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new ResidencyApplication(),
    emailExists: false,
    count: 0,
  };
};

const state = getDefaultState();
const namespaced = true;

export const residencyApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
