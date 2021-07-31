import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';
import SideOrganization from '@/classes/sideOrganization/SideOrganization';

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
