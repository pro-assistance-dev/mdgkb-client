import { MutationTree } from 'vuex';

import DailyMenuItem from '@/classes/DailyMenuItem';
import IDailyMenuItem from '@/interfaces/IDailyMenuItem';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDailyMenuItem[]) {
    state.items = items.map((i: IDailyMenuItem) => new DailyMenuItem(i));
  },
  set(state, item: IDailyMenuItem) {
    state.item = new DailyMenuItem(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDailyMenuItem) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DailyMenuItem();
  },
};

export default mutations;
