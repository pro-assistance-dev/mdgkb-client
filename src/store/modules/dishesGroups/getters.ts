import { GetterTree } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  items(state): DishesGroup[] {
    return state.items;
  },
  item(state): DishesGroup {
    return state.item;
  },
};

export default getters;
