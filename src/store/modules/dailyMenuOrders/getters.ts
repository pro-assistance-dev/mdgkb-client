import { GetterTree } from 'vuex';

import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDailyMenuOrder[] {
    return state.items;
  },
  item(state): IDailyMenuOrder {
    return state.item;
  },
};

export default getters;
