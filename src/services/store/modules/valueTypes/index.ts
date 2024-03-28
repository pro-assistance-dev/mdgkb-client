import { Module } from 'vuex';

import ValueType from '@/services/classes/ValueType';
import RootState from '@/services/interfaces/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default interface State {
  items: ValueType[];
  item: ValueType;
}

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new ValueType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const valueTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
