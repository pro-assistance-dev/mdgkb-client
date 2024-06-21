import { ElLoading } from 'element-plus';
import { MutationTree } from 'vuex';

import IAdminMenu from '@/interfaces/IAdminMenu';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import IPathPermission from '@/interfaces/IPathPermission';
import AdminButtonParams from '@/services/classes/admin/AdminButtonParams';
import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
import menuList from '@/store/modules/admin/menuList';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setHeaderParams(state, params: AdminHeaderParams) {
    console.log(params);
    state.headerParams = new AdminHeaderParams(params);
  },
  addButtons(state, buttons: AdminButtonParams[]) {
    console.log(state.headerParams.buttons);
    state.headerParams.buttons.push(...buttons);
    console.log(state.headerParams.buttons);
  },
  collapseSideMenu(state) {
    state.isCollapseSideMenu = !state.isCollapseSideMenu;
  },
  closeDrawer(state) {
    state.isDrawerOpen = false;
  },
  openDrawer(state) {
    state.isDrawerOpen = true;
    state.isCollapseSideMenu = false;
  },
  showHeader(state, showHeader: boolean) {
    state.showHeader = showHeader;
  },
  showLoading(state) {
    state.loading = ElLoading.service({
      lock: true,
      text: 'Загрузка',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  },
  closeLoading(state) {
    state.loading?.close();
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  filterMenus(state, userPermissions: IPathPermission[]) {
    // state.menus = [...menuList].filter((m: IAdminMenu) =>
    //   userPermissions.some((permission: IPathPermission) => permission.resource === m.to)
    // );
    // // state.menus = state.menus.filter((m: IAdminMenu) => m.showTo?.includes(String(user.role.name)));
    // state.menus.forEach((m: IAdminMenu) => {
    //   if (!m.children) {
    //     return;
    //   }
    //   m.children = m.children.filter((m: IAdminMenu) =>
    //     userPermissions.some((permission: IPathPermission) => permission.resource === m.to)
    //   );
    //   // m.children = m.children.filters((m: IAdminMenu) => m.showTo?.includes(String(user.role.name)));
    // });

    state.searchMenus = [];
    state.menus.forEach((el: IAdminMenu) => {
      if (el.to !== '/') {
        state.searchMenus.push({ value: el.title, link: el.to });
      } else if (el.children?.length) {
        el.children.forEach((el: IAdminMenu) => {
          state.searchMenus.push({ value: el.title, link: el.to });
        });
      }
    });
  },
  setApplicationsCounts(state, items: IApplicationsCount[]) {
    items.forEach((i: IApplicationsCount) => {
      let menu = state.menus.find((m: IAdminMenu) => m.tableName === i.tableName);
      if (menu) {
        menu.count = i.count;
      }
      state.menus.forEach((m: IAdminMenu) => {
        menu = m.children?.find((cm: IAdminMenu) => cm.tableName === i.tableName);
        if (menu) {
          menu.count = i.count;
        }
      });
    });
  },
};

export default mutations;
