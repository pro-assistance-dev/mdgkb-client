import { MutationTree } from 'vuex';

import Page from '@/services/classes/page/Page';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Page, State>(Page),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setSideMenuDialogActive(state, value: boolean) {
    state.isSideMenuDialogActive = value;
  },
  setPageSectionDialogActive(state, value: boolean) {
    state.isPageSectionDialogActive = value;
  },
  setIndex(state, value: number) {
    state.index = value;
  },
  setActiveMenuId(state, value: string) {
    state.activeMenuId = value;
  },
  setPageSectionIndex(state, value: number) {
    state.pageSectionIndex = value;
  },
};

export default mutations;
