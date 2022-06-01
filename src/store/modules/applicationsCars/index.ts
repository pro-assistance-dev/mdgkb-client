import { Module } from 'vuex';

import ApplicationCar from '@/classes/ApplicationCar';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new ApplicationCar(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const applicationsCars: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
