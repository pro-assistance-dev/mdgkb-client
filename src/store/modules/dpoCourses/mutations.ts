import { MutationTree } from 'vuex';

import DpoCourse from '@/classes/DpoCourse';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IDpoCourseWithCount from '@/interfaces/IDpoCourseWithCount ';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDpoCourse[]) {
    state.items = items.map((i: IDpoCourse) => new DpoCourse(i));
  },
  setAllWithCount(state, items: IDpoCourseWithCount) {
    if (!items.dpoCourses) {
      state.items = [];
      return;
    }
    state.items = items.dpoCourses.map((i: IDpoCourse) => new DpoCourse(i));
    state.count = items.count;
  },
  appendToAll(state, items: IDpoCourseWithCount) {
    if (!items.dpoCourses) {
      state.items = [];
      return;
    }
    const dpoCourses = items.dpoCourses.map((i: IDpoCourse) => new DpoCourse(i));
    state.items.push(...dpoCourses);
    state.count = items.count;
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
  clearItems(state) {
    state.items = [];
  },
};

export default mutations;
