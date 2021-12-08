import { Module } from 'vuex';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    headerParams: new AdminHeaderParams(),
    isCollapseSideMenu: true,
    isDrawerOpen: false,
    loading: undefined,
  };
};

const state = getDefaultState();
const namespaced = true;

export const admin: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
