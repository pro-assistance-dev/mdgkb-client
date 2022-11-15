import { MutationTree } from 'vuex';

import DishSample from '@/classes/DishSample';
import IDishSample from '@/interfaces/IDishSample';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDishSample[]) {
    state.items = items.map((i: IDishSample) => new DishSample(i));
  },
  set(state, item: IDishSample) {
    state.item = new DishSample(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDishSample) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DishSample();
  },
};

export default mutations;
