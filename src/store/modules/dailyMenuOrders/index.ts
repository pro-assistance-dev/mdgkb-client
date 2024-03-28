import { Module } from 'vuex';

import DailyMenuOrder from '@/classes/DailyMenuOrder';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DailyMenuOrder>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DailyMenuOrder),
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
