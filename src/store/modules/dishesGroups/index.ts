import { Module } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DishesGroup>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DishesGroup),
  };
};

const state = getDefaultState();
const namespaced = true;

export const dishesGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
