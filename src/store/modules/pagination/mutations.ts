import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCurPage(state, page: number): void {
    state.curPage = page;
  },
};

export default mutations;
