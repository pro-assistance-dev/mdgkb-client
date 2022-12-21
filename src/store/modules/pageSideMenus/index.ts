import { Module } from 'vuex';

import PageSideMenu from '@/classes/PageSideMenu';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PageSideMenu(),
    fileInfos: [],
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
