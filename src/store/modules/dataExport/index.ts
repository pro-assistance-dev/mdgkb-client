import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const namespaced = true;

const dataExport: Module<RootState, RootState> = {
  namespaced,
  getters,
  actions,
  mutations,
};

export default dataExport;
