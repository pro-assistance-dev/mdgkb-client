import { Module } from 'vuex';

import PartnerType from '@/classes/PartnerType';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PartnerType>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PartnerType),
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
