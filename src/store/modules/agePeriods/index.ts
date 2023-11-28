import { Module } from 'vuex';

import DietAge from '@/classes/DietAge';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<DietAge> {
  selectedItemId: string;
}
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DietAge),
    selectedItemId: '',
  };
};

const state = getDefaultState();
const namespaced = true;

export const agePeriods: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
