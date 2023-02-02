import { Module } from 'vuex';

import PageSideMenu from '@/classes/PageSideMenu';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
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
