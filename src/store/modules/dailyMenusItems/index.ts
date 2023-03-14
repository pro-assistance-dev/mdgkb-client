import { Module } from 'vuex';

import DailyMenuItem from '@/classes/DailyMenuItem';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DailyMenuItem>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DailyMenuItem),
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
