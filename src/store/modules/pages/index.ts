import { Module } from 'vuex';

import Page from '@/services/classes/page/Page';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Page> {
  isSideMenuDialogActive: boolean;
  isPageSectionDialogActive: boolean;
  index: number;
  pageSectionIndex: number;
  activeMenuId: string;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Page),
    isSideMenuDialogActive: false,
    isPageSectionDialogActive: false,
    index: 0,
    pageSectionIndex: 0,
    activeMenuId: '999',
  };
};

export const state = getDefaultState();

const namespaced = true;

export const pages: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
