import { GetterTree } from 'vuex';

import Partner from '@/classes/Partner';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): Partner[] {
    return state.items;
  },
  filteredItems(state): Partner[] {
    return state.filteredItems;
  },
  item(state): Partner {
    return state.item;
  },
};

export default getters;
