import { MutationTree } from 'vuex';

import EducationYear from '@/classes/EducationYear';
import IEducationYear from '@/interfaces/IEducationYear';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IEducationYear[]) {
    state.items = items.map((i: IEducationYear) => new EducationYear(i));
  },
  appendToAll(state, items: IEducationYear[]) {
    const itemsForAdding = items.map((i: IEducationYear) => new EducationYear(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IEducationYear) {
    state.item = new EducationYear(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IEducationYear) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new EducationYear();
  },
};

export default mutations;
