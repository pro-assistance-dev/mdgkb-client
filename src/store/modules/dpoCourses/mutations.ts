import { MutationTree } from 'vuex';

import DpoCourse from '@/classes/DpoCourse';
import IDpoCourse from '@/interfaces/IDpoCourse';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDpoCourse[]) {
    state.items = items.map((i: IDpoCourse) => new DpoCourse(i));
  },
  appendToAll(state, items: IDpoCourse[]) {
    const itemsForAdding = items.map((i: IDpoCourse) => new DpoCourse(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IDpoCourse) {
    state.item = new DpoCourse(item);
  },
  setIsNmo(state, isNmo: boolean) {
    state.item.isNmo = isNmo;
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDpoCourse) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DpoCourse();
  },
};

export default mutations;
