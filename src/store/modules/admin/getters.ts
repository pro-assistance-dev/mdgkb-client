import { GetterTree } from 'vuex';

import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';
import IAdminMenu from '@/interfaces/IAdminMenu';
import UserService from '@/services/User';
import menuList from '@/store/modules/admin/menuList';
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
    state.menus = menuList.filter((m: IAdminMenu) => m.showTo?.includes(String(user.role.name)));
    state.menus.forEach((m: IAdminMenu) => {
      if (!m.children) {
        return;
      }
      m.children = m.children.filter((m: IAdminMenu) => m.showTo?.includes(String(user.role.name)));
    });
    return state.menus;
  },
};

export default getters;
