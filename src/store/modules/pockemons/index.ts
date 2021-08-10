import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

const state: State = {
  name: '',
};

const pockemons: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default pockemons;
