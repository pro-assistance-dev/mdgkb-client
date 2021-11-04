import { MutationTree } from 'vuex';

import State from './state';

const mutations: MutationTree<State> = {
  toggleDrawer(state, isOpen: boolean) {
    state.isSearchDrawerOpen = isOpen;
  },
};

export default mutations;
