import { Module } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DpoApplication(),
    emailExists: false,
    count: 0,
  };
};

const state = getDefaultState();
const namespaced = true;

export const dpoApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
