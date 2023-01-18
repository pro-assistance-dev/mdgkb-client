import { MutationTree } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';
import IDishesGroup from '@/interfaces/IDishesGroup';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDishesGroup[]) {
    if (!items) {
      return;
    }
    state.items = items.map((i: IDishesGroup) => new DishesGroup(i));
  },
  set(state, item: IDishesGroup) {
    state.item = new DishesGroup(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDishesGroup) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DishesGroup();
  },
};

export default mutations;
