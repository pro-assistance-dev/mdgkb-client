import { MutationTree } from 'vuex';

import Diet from '@/classes/Diet';
import IDiet from '@/interfaces/IDiet';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDiet[]) {
    state.items = items.map((i: IDiet) => new Diet(i));
  },
  set(state, item: IDiet) {
    state.item = new Diet(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDiet) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Diet();
  },
};

export default mutations;
