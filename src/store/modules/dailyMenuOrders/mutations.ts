import { MutationTree } from 'vuex';

import DailyMenuOrder from '@/classes/DailyMenuOrder';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDailyMenuOrder[]) {
    state.items = items.map((i: IDailyMenuOrder) => new DailyMenuOrder(i));
  },
  set(state, item: IDailyMenuOrder) {
    state.item = new DailyMenuOrder(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDailyMenuOrder) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DailyMenuOrder();
  },
};

export default mutations;
