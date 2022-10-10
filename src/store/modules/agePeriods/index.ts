import { Module } from 'vuex';

import AgePeriod from '@/classes/AgePeriod';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new AgePeriod(),
    selectedItemId: '',
  };
};

const state = getDefaultState();
const namespaced = true;

export const agePeriods: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
