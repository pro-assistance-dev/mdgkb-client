import { MutationTree } from 'vuex';

import Role from '@/classes/Role';
import IRole from '@/interfaces/IRole';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IRole[]) {
    state.items = items.map((i: IRole) => new Role(i));
  },
  appendToAll(state, items: IRole[]) {
    const itemsForAdding = items.map((i: IRole) => new Role(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IRole) {
    state.item = new Role(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IRole) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Role();
  },
};

export default mutations;
