import { MutationTree } from 'vuex';

import State from './state';

const mutations: MutationTree<State> = {
  setToken(state, token: string) {
    state.token = token;
  },
};

export default mutations;
