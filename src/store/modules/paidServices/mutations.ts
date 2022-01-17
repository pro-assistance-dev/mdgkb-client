import { MutationTree } from 'vuex';

import PaidService from '@/classes/PaidService';
import IPaidService from '@/interfaces/IPaidService';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPaidService[]) {
    state.items = items?.map((a: IPaidService) => new PaidService(a));
  },
  set(state, item?: IPaidService) {
    if (item) {
      state.item = new PaidService(item);
    } else {
      state.item = new PaidService();
    }
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id) {
    const index = state.items.findIndex((i: IPaidService) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
