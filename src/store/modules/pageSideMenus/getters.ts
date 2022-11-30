import { GetterTree } from 'vuex';

import IPageSideMenu from '@/interfaces/IPageSideMenu';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPageSideMenu[] {
    return state.items;
  },
  item(state): IPageSideMenu {
    return state.item;
  },
};

export default getters;
