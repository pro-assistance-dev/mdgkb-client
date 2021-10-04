import { MutationTree } from 'vuex';

import Menu from '@/classes/menu/Menu';
import SubMenu from '@/classes/menu/SubMenu';
import SubSubMenu from '@/classes/menu/SubSubMenu';
import IMenu from '@/interfaces/menu/IMenu';
import ISubMenu from '@/interfaces/menu/ISubMenu';
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, menus: IMenu[]) {
    state.menus = menus.map((i: IMenu) => new Menu(i));
  },
  set(state, menu?: IMenu) {
    state.menu = new Menu(menu);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  addSubMenu(state) {
    state.menu.link = '';
    state.menu.pageId = undefined;
    state.menu.subMenus.push(new SubMenu());
  },
  addSubSubMenu(state, index: number) {
    state.menu.subMenus[index].subSubMenus.push(new SubSubMenu());
  },
  removeSubMenu(state, index: number) {
    const idForDelete = state.menu.subMenus[index].id;
    if (idForDelete) {
      state.menu.subMenusForDelete.push(idForDelete);
    }
    state.menu.subMenus.splice(index, 1);
  },
  removeSubSubMenu(state, subSubMenu: ISubSubMenu) {
    state.menu.subMenus.forEach((subMenu: ISubMenu) => {
      const index = subMenu.subSubMenus.indexOf(subSubMenu);
      if (index > -1) {
        const idForDelete = subMenu.subSubMenus[index].id;
        if (idForDelete) {
          subMenu.subSubMenusForDelete.push(idForDelete);
        }
        subMenu.subSubMenus.splice(index);
      }
    });
  },
};

export default mutations;
