import Vuex, { StoreOptions } from 'vuex'

import RootState from './types';
import pockemons from './modules/pockemons';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'main-layout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    pockemons,
  }
}

export default new Vuex.Store<RootState>(store);
