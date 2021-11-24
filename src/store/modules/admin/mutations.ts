import { ElLoading } from 'element-plus';
import { MutationTree } from 'vuex';

import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setPageTitle(state, params: IAdminHeaderParams) {
    state.pageTitle = params.title;
    if (params.saveButton) {
      state.showSaveButton = true;
    } else {
      state.showSaveButton = false;
    }
    state.loading?.close();
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
  setSubmit(state, value: () => Promise<void>) {
    const submit = async () => {
      state.loadingSaveButton = true;
      await value();
      state.loadingSaveButton = false;
    };
    state.submit = submit;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
