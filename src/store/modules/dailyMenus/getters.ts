import { GetterTree } from 'vuex';

import DailyMenu from '@/classes/DailyMenu';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  todayMenu(state): DailyMenu {
    return state.todayMenu;
  },
  periodItems(state): DailyMenu[] {
    return state.periodItems;
  },
  menusCopies(state): DailyMenu[] {
    return state.menusCopies;
  },
};

export default getters;
