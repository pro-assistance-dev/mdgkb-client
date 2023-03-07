import { GetterTree } from 'vuex';

import Page from '@/services/classes/page/Page';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Page, State>(),
  isSideMenuDialogActive(state): boolean {
    return state.isSideMenuDialogActive;
  },
  isPageSectionDialogActive(state): boolean {
    return state.isPageSectionDialogActive;
  },
  sideMenu(state) {
    return state.item.pageSideMenus[state.index];
  },
  pageSection(state) {
    return state.item.pageSideMenus[state.index].pageSections[state.pageSectionIndex];
  },
};

export default getters;
