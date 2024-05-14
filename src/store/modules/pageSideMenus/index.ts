import { Module } from 'vuex';

import PageSideMenu from '@/services/classes/page/PageSideMenu';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PageSideMenu>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PageSideMenu),
  };
};

const state = getDefaultState();
const namespaced = true;

export const pageSideMenus: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
