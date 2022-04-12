import { ElLoading } from 'element-plus';
import { MutationTree } from 'vuex';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';

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
};

export default mutations;
