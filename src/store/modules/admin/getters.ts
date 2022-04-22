import { GetterTree } from 'vuex';

import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';
import IAdminMenu from '@/interfaces/IAdminMenu';
import UserService from '@/services/User';
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
  menus(state): IAdminMenu[] {
    const user = UserService.getUser();
    if (!user) {
      return [];
    }
    return state.menus;
  },
};

export default getters;
