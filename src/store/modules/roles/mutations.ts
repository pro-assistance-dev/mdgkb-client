import { MutationTree } from 'vuex';

import Role from '@/services/classes/Role';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: Role[]) {
    state.items = items.map((i: Role) => new Role(i));
  },
  appendToAll(state, items: Role[]) {
    const itemsForAdding = items.map((i: Role) => new Role(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: Role) {
    state.item = new Role(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: Role) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Role();
  },
};

export default mutations;
