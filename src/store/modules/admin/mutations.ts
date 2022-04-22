import { ElLoading } from 'element-plus';
import { MutationTree } from 'vuex';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';
import IAdminMenu from '@/interfaces/IAdminMenu';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISchema from '@/interfaces/schema/ISchema';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setHeaderParams(state, params: IAdminHeaderParams) {
    state.headerParams = new AdminHeaderParams(params);
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
  setSchemaMenu(state, schema: ISchema) {
    // state.menus.forEach()
  },
  setApplicationsCounts(state, items: IApplicationsCount[]) {
    console.log(items);
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
    console.log(state.menus);
  },
};

export default mutations;
