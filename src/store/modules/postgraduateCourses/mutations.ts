import { MutationTree } from 'vuex';

import PostgraduateCourse from '@/classes/PostgraduateCourse';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IPostgraduateCourseWithCount from '@/interfaces/IPostgraduateCourseWithCount';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPostgraduateCourse[]) {
    state.items = items.map((i: IPostgraduateCourse) => new PostgraduateCourse(i));
  },
  setAllWithCount(state, items: IPostgraduateCourseWithCount) {
    if (!items.postgraduateCourses) {
      state.items = [];
      return;
    }
    state.items = items.postgraduateCourses.map((i: IPostgraduateCourse) => new PostgraduateCourse(i));
    state.count = items.count;
  },
  appendToAll(state, items: IPostgraduateCourseWithCount) {
    if (!items.postgraduateCourses) {
      state.items = [];
      return;
    }
    const dpoCourses = items.postgraduateCourses.map((i: IPostgraduateCourse) => new PostgraduateCourse(i));
    state.items.push(...dpoCourses);
    state.count = items.count;
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
  clearItems(state) {
    state.items = [];
  },
};

export default mutations;
