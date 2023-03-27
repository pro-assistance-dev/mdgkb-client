import { GetterTree } from 'vuex';

import IAdminMenu from '@/interfaces/IAdminMenu';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISearchQuery from '@/interfaces/ISearchQuery';
import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
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
  searchMenus(state): ISearchQuery[] {
    return state.searchMenus;
  },
  applicationsCounts(state): IApplicationsCount[] {
    return state.applicationsCounts;
  },
  applicationsCount(state): (tableName: string) => number {
    return (tableName: string): number => {
      const applicationsCount = state.applicationsCounts.find((item: IApplicationsCount) => item.tableName === tableName);
      return applicationsCount?.count || 0;
    };
  },
};

export default getters;
