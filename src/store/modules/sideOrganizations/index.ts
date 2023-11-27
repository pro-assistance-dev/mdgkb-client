import { Module } from 'vuex';

import SideOrganization from '@/classes/SideOrganization';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<SideOrganization>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(SideOrganization),
  };
};

const state = getDefaultState();
const namespaced = true;

export const sideOrganizations: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
