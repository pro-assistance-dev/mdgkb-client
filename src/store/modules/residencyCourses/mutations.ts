import { MutationTree } from 'vuex';

import ResidencyCourse from '@/classes/ResidencyCourse';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCourseWithCount from '@/interfaces/IResidencyCourseWithCount ';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IResidencyCourse[]) {
    state.items = items.map((i: IResidencyCourse) => new ResidencyCourse(i));
  },
  setAllWithCount(state, items: IResidencyCourseWithCount) {
    if (!items.residencyCourses) {
      state.items = [];
      return;
    }
    state.items = items.residencyCourses.map((i: IResidencyCourse) => new ResidencyCourse(i));
    state.count = items.count;
  },
  appendToAll(state, items: IResidencyCourseWithCount) {
    if (!items.residencyCourses) {
      state.items = [];
      return;
    }
    const dpoCourses = items.residencyCourses.map((i: IResidencyCourse) => new ResidencyCourse(i));
    state.items.push(...dpoCourses);
    state.count = items.count;
  },
  set(state, item: IResidencyCourse) {
    state.item = new ResidencyCourse(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IResidencyCourse) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new ResidencyCourse();
  },
  clearItems(state) {
    state.items = [];
  },
};

export default mutations;
