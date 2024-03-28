import { MutationTree } from 'vuex';

import DailyMenu from '@/classes/DailyMenu';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DailyMenu),
  setPeriodItems(state, items: DailyMenu[]) {
    state.periodItems = items.map((i: DailyMenu) => new DailyMenu(i));
  },
  setTodayMenu(state, item: DailyMenu) {
    state.todayMenu = new DailyMenu(item);
  },
  setMenusCopies(state, items: DailyMenu[]) {
    state.menusCopies = items;
  },
};

export default mutations;
