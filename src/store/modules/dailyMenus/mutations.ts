import { MutationTree } from 'vuex';

import DailyMenu from '@/classes/DailyMenu';
import IDailyMenu from '@/interfaces/IDailyMenu';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDailyMenu[]) {
    state.items = items.map((i: IDailyMenu) => new DailyMenu(i));
  },
  set(state, item: IDailyMenu) {
    state.item = new DailyMenu(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDailyMenu) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DailyMenu();
  },
};

export default mutations;
