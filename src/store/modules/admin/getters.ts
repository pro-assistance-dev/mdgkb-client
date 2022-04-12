import { GetterTree } from 'vuex';

import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  headerParams(state): IAdminHeaderParams {
    return state.headerParams;
  },
  isCollapseSideMenu(state): boolean {
    return state.isCollapseSideMenu;
  },
  isDrawerOpen(state): boolean {
    return state.isDrawerOpen;
  },
  showHeader(state): boolean {
    return state.showHeader;
  },
};

export default getters;
