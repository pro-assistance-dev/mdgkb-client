import { MutationTree } from 'vuex';

import Menu from '@/classes/Menu';
import IMenu from '@/interfaces/IMenu';
import UserService from '@/services/User';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IMenu[]) {
    state.items = items.map((i: IMenu) => new Menu(i));
    state.menus = items.map((i: IMenu) => new Menu(i));
    if (!UserService.isAdmin()) {
      state.menus = [];
      state.items.forEach((i: IMenu) => {
        if (!i.hide) {
          state.menus.push(new Menu(i));
        }
      });
      return;
    }
  },
  setMenus(state) {
    if (!UserService.isAdmin()) {
      state.menus = [];
      state.items.forEach((i: IMenu) => {
        if (!i.hide) {
          state.menus.push(new Menu(i));
        }
      });
      return;
    }
    state.menus = state.items;
  },
  set(state, item?: IMenu) {
    state.item = new Menu(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IMenu) => i.id === id);
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
