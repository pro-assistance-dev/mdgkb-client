import { GetterTree } from 'vuex';

import IDailyMenu from '@/interfaces/IDailyMenu';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDailyMenu[] {
    return state.items;
  },
  item(state): IDailyMenu {
    return state.item;
  },
};

export default getters;
