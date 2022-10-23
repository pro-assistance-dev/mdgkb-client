import { MutationTree } from 'vuex';

import DietGroup from '@/classes/DietGroup';
import IDietGroup from '@/interfaces/IDietGroup';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDietGroup[]) {
    state.items = items.map((i: IDietGroup) => new DietGroup(i));
  },
  set(state, item: IDietGroup) {
    state.item = new DietGroup(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDietGroup) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DietGroup();
  },
};

export default mutations;
