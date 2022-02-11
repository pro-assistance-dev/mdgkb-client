import { MutationTree } from 'vuex';

import CallbackRequest from '@/classes/CallbackRequest';

import { State } from './state';

const mutations: MutationTree<State> = {
  resetItem(state) {
    state.item = new CallbackRequest();
  },
};

export default mutations;
