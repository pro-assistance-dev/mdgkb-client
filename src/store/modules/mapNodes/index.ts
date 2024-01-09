import { Module } from 'vuex';

import MapNodeRequestObject from '@/classes/MapNodeRequestObject';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<MapNodeRequestObject>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(MapNodeRequestObject),
  };
};

const state = getDefaultState();
const namespaced = true;

export const mapNodes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
