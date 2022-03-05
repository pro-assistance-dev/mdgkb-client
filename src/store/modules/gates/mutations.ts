import { MutationTree } from 'vuex';

import Gate from '@/classes/Gate';
import IGate from '@/interfaces/IGate';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IGate[]) {
    state.items = items.map((i: IGate) => new Gate(i));
  },
  appendToAll(state, items: IGate[]) {
    const itemsForAdding = items.map((i: IGate) => new Gate(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IGate) {
    state.item = new Gate(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IGate) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
