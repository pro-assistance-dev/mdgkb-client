import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  pageTitle(state): string {
    return state.pageTitle;
  },
  isCollapseSideMenu(state): boolean {
    return state.isCollapseSideMenu;
  },
  isDrawerOpen(state): boolean {
    return state.isDrawerOpen;
  },
};

export default getters;
