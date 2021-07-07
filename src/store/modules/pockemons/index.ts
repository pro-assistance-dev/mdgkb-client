import { Module } from 'vuex';

import RootState from '@/store/types';
import State from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: State = {
  name: '',
}

const pockemons: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default pockemons;
