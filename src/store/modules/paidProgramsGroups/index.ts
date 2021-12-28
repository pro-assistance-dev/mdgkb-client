import { Module } from 'vuex';

import PaidProgramsGroup from '@/classes/PaidProgramsGroup';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PaidProgramsGroup(),
    itemsForDelete: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const paidProgramsGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
