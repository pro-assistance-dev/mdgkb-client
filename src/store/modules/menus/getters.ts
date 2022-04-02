import { GetterTree } from 'vuex';

import IMenu from '@/interfaces/IMenu';
import UserService from '@/services/User';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IMenu[] {
    if (!UserService.isAdmin()) {
      return state.items.filter((menu: IMenu) => !menu.hide);
    }
    return state.items;
  },
  menus(state): IMenu[] {
    return state.menus;
  },
  item(state): IMenu {
    return state.item;
  },
};

export default getters;
