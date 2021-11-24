import { Module } from 'vuex';

import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    pageTitle: '',
    showSaveButton: false,
    loadingSaveButton: false,
    isCollapseSideMenu: true,
    isDrawerOpen: false,
    loading: undefined,
    submit: undefined,
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
