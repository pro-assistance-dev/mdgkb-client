import { GetterTree } from 'vuex';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import IAdminMenu from '@/interfaces/IAdminMenu';
import ISearchQuery from '@/interfaces/ISearchQuery';
import UserService from '@/services/User';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  headerParams(state): AdminHeaderParams {
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
  adminMenus(state): ISearchQuery[] {
    return state.adminMenus;
  },
};

export default getters;
