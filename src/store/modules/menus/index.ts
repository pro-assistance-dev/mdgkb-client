import { Module } from 'vuex';

import Menu from '@/services/classes/Menu';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State {
  items: Menu[];
  menus: Menu[];
  item: Menu;
  itemsForDelete: string[];
}

export const getDefaultState = (): State => {
  return {
    items: [],
    menus: [],
    item: new Menu(),
    itemsForDelete: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const menus: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
