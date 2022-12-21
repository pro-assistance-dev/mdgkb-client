import { Module } from 'vuex';

import DailyMenuOrder from '@/classes/DailyMenuOrder';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new DailyMenuOrder(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dailyMenuOrders: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
