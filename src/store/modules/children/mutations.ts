import { MutationTree } from 'vuex';

import Child from '@/classes/Child';
import IChild from '@/interfaces/IChild';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IChild[]) {
    state.items = items.map((i: IChild) => new Child(i));
  },
  appendToAll(state, items: IChild[]) {
    const itemsForAdding = items.map((i: IChild) => new Child(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IChild) {
    state.item = new Child(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IChild) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
