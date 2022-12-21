import { MutationTree } from 'vuex';

import PageSideMenu from '@/classes/PageSideMenu';
import IPageSideMenu from '@/interfaces/IPageSideMenu';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPageSideMenu[]) {
    state.items = items.map((i: IPageSideMenu) => new PageSideMenu(i));
  },
  set(state, item: IPageSideMenu) {
    state.item = new PageSideMenu(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPageSideMenu) => i.id === id);
    state.items.splice(index, 1);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
