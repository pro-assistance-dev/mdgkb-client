import { MutationTree } from 'vuex';

import Menu from '@/classes/Menu';
import SubMenu from '@/classes/SubMenu';
import UserService from '@/services/User';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  setAll(state, items: Menu[]) {
    state.items = items.map((i: Menu) => new Menu(i));
    state.menus = items.map((i: Menu) => new Menu(i));
    mutations.setMenus(state);
  },
  setMenus(state) {
    if (!UserService.isAdmin()) {
      state.menus = [];
      state.items.forEach((i: Menu) => {
        if (!i.hide) {
          state.menus.push(new Menu(i));
        }
      });
      state.menus.forEach((m: Menu) => {
        m.subMenus = m.subMenus.filter((s: SubMenu) => !s.hide);
      });
      return;
    }
    state.menus = state.items;
  },
  set(state, item?: Menu) {
    state.item = new Menu(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: Menu) => i.id === id);
    state.items.splice(index, 1);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  addToDeleting(state, id: string) {
    state.itemsForDelete.push(id);
  },
};

export default mutations;
