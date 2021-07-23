import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  setPageTitle(state, title: string) {
    state.pageTitle = title;
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
};

export default mutations;
