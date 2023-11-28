import { MutationTree } from 'vuex';

import Partner from '@/classes/Partner';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: Partner[]) {
    state.items = items.map((i: Partner) => new Partner(i));
  },
  setFilteredItems(state, items: Partner[]) {
    state.filteredItems = items;
  },
  set(state, item: Partner) {
    state.item = new Partner(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: Partner) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Partner();
  },
};

export default mutations;
