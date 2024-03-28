import { Module } from 'vuex';

import MapRoute from '@/classes/MapRoute';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<MapRoute>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(MapRoute),
  };
};

const state = getDefaultState();
const namespaced = true;

export const mapRoutes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
