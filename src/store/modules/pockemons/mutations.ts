import { MutationTree } from 'vuex';

import State from './state';

const mutations: MutationTree<State> = {
  set(state: State, pockemon: { name: { english: string } }): void {
    state.name = pockemon.name.english;
  },
};

export default mutations;
