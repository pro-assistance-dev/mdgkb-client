import { Module } from 'vuex';

import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  pageTitle: '',
  showSaveButton: false,
  loadingSaveButton: false,
  isCollapseSideMenu: true,
  isDrawerOpen: false,
  loading: undefined,
  submit: undefined,
};

const namespaced = true;

export const admin: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
