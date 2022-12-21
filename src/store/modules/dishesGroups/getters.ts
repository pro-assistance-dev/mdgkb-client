import { GetterTree } from 'vuex';

import IDishesGroup from '@/interfaces/IDishesGroup';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDishesGroup[] {
    return state.items;
  },
  item(state): IDishesGroup {
    return state.item;
  },
};

export default getters;
