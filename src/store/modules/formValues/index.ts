import { Module } from 'vuex';

import Form from '@/classes/Form';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Form>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Form),
  };
};
const state = getDefaultState();
const namespaced = true;

export const formValues: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
