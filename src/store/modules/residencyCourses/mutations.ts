import { MutationTree } from 'vuex';

import ResidencyCourse from '@/classes/ResidencyCourse';
import IResidencyCourse from '@/interfaces/IResidencyCourse';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IResidencyCourse[]) {
    state.items = items.map((i: IResidencyCourse) => new ResidencyCourse(i));
  },
  appendToAll(state, items: IResidencyCourse[]) {
    const itemsForAdding = items.map((i: IResidencyCourse) => new ResidencyCourse(i));
    state.items.push(...itemsForAdding);
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
};

export default mutations;
