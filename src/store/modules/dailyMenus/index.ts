import { Module } from 'vuex';

import DailyMenu from '@/classes/DailyMenu';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<DailyMenu> {
  periodItems: DailyMenu[];
  todayMenu: DailyMenu;
  menusCopies: DailyMenu[];
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DailyMenu),
    periodItems: [],
    todayMenu: new DailyMenu(),
    menusCopies: [],
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
