import { GetterTree } from 'vuex';

import Menu from '@/services/classes/Menu';
import UserService from '@/services/User';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  items(state): Menu[] {
    if (!UserService.isAdmin()) {
      return state.items.filter((menu: Menu) => !menu.hide);
    }
    return state.items;
  },
  menus(state): Menu[] {
    return state.menus;
  },
  item(state): Menu {
    return state.item;
  },
};

export default getters;
