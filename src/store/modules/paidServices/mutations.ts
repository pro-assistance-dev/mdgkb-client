import { MutationTree } from 'vuex';

import PaidService from '@/classes/PaidService';
import IPaidService from '@/interfaces/IPaidService';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPaidService[]) {
    state.items = items.map((i: IPaidService) => new PaidService(i));
  },
  set(state, item: IPaidService) {
    state.item = new PaidService(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPaidService) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new PaidService();
  },
};

export default mutations;
