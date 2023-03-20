import { MutationTree } from 'vuex';

import DailyMenu from '@/classes/DailyMenu';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DailyMenu),
  setPeriodItems(state, items: DailyMenu[]) {
    state.periodItems = items.map((i: DailyMenu) => new DailyMenu(i));
  },
  setTodayMenu(state, item: DailyMenu) {
    state.todayMenu = new DailyMenu(item);
  },
};

export default mutations;
