import { Module } from 'vuex';

import FormStatusGroup from '@/classes/FormStatusGroup';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new FormStatusGroup(),
    count: 0,
    showDialog: false,
    dialogTitle: '',
  };
};

const state = getDefaultState();
const namespaced = true;

export const formStatusGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
