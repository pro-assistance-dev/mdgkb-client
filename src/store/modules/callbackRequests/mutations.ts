import { MutationTree } from 'vuex';

import CallbackRequest from '@/classes/CallbackRequest';
import ICallbackRequest from '@/interfaces/ICallbackRequest';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICallbackRequest[]) {
    if (!items.length) {
      return;
    }
    state.items = items.map((i: ICallbackRequest) => new CallbackRequest(i));
  },
};

export default mutations;
