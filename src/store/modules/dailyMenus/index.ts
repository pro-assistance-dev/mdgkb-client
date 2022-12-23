import { Module } from 'vuex';

import DailyMenu from '@/classes/DailyMenu';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    periodItems: [],
    item: new DailyMenu(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dailyMenus: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
