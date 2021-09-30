import { GetterTree } from 'vuex';

import IMenu from '@/interfaces/menu/IMenu';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  menus(state): IMenu[] {
    return state.menus;
  },
  menu(state): IMenu {
    return state.menu;
  },
};

export default getters;
