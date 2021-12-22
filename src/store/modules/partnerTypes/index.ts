import { Module } from 'vuex';

import PartnerType from '@/classes/partners/PartnerType';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PartnerType(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const partnerTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
