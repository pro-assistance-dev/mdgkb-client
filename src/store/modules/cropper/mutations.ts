import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  setIsOpen(state, condition: boolean) {
    state.cropper.isOpen = condition;
  },
};

export default mutations;
