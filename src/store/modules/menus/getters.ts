import { GetterTree } from 'vuex';

import IMenu from '@/interfaces/IMenu';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IMenu[] {
    return state.items;
  },
  item(state): IMenu {
    return state.item;
  },
};

export default getters;
