import { Module } from 'vuex';

import SideOrganization from '@/classes/SideOrganization';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  sideOrganizations: [],
  sideOrganization: new SideOrganization(),
};

const namespaced = true;

export const sideOrganizations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
