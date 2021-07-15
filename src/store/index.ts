import Vuex, { StoreOptions } from 'vuex';

import RootState from './types';
import pockemons from './modules/pockemons';
import { divisions } from '@/store/modules/divisions';
import { news } from '@/store/modules/news';
import { likes } from '@/store/modules/likes';
import { normativeDocuments } from '@/store/modules/normativeDocuments';
import { healthOrganizations } from '@/store/modules/healthOrganizations';
import { buildings } from '@/store/modules/buildings';

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
    news,
    likes,
    normativeDocuments,
    buildings,
    healthOrganizations,
  },
};

export default new Vuex.Store<RootState>(store);
