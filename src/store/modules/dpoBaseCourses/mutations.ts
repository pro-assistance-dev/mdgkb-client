import { MutationTree } from 'vuex';

import DpoBaseCourse from '@/classes/DpoBaseCourse';
import IDpoBaseCourse from '@/interfaces/IDpoBaseCourse';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDpoBaseCourse[]) {
    state.items = items.map((i: IDpoBaseCourse) => new DpoBaseCourse(i));
  },
  appendToAll(state, items: IDpoBaseCourse[]) {
    const itemsForAdding = items.map((i: IDpoBaseCourse) => new DpoBaseCourse(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IDpoBaseCourse) {
    state.item = new DpoBaseCourse(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDpoBaseCourse) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
