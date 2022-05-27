import { Module } from 'vuex';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import actions from '@/store/modules/admin/actions';
import menuList from '@/store/modules/admin/menuList';
import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    headerParams: new AdminHeaderParams(),
    showHeader: false,
    isCollapseSideMenu: false,
    isDrawerOpen: false,
    loading: undefined,
    menus: menuList,
    adminMenus: [],
  };
};

const state = getDefaultState();
const namespaced = true;

export const admin: Module<State, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};
