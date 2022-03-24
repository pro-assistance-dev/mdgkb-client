import { MutationTree } from 'vuex';

import PostgraduateCourse from '@/classes/PostgraduateCourse';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPostgraduateCourse[]) {
    state.items = items.map((i: IPostgraduateCourse) => new PostgraduateCourse(i));
  },
  appendToAll(state, items: IPostgraduateCourse[]) {
    const itemsForAdding = items.map((i: IPostgraduateCourse) => new PostgraduateCourse(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IPostgraduateCourse) {
    state.item = new PostgraduateCourse(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPostgraduateCourse) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new PostgraduateCourse();
  },
};

export default mutations;
