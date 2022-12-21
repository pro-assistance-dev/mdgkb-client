import { Module } from 'vuex';

import DailyMenuItem from '@/classes/DailyMenuItem';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DailyMenuItem(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dailyMenuItems: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
