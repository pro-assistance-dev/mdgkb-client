import Vuex, { StoreOptions } from 'vuex';

import RootState from './types';
import pockemons from './modules/pockemons';
import { divisions } from '@/store/modules/divisions';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'main-layout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    pockemons,
    divisions,
  },
};

export default new Vuex.Store<RootState>(store);
