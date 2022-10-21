import { Module } from 'vuex';

import DietGroup from '@/classes/DietGroup';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DietGroup(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dietsGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
