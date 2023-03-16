import { MutationTree } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';

import { State } from './index';

const mutations: MutationTree<State> = {
  setAll(state, items: DishesGroup[]) {
    if (!items) {
      return;
    }
    state.items = items.map((i: DishesGroup) => new DishesGroup(i));
  },
  set(state, item: DishesGroup) {
    state.item = new DishesGroup(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: DishesGroup) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DishesGroup();
  },
};

export default mutations;
