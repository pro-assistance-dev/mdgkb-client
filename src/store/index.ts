import Vuex, { StoreOptions } from 'vuex';

import RootState from './types';
import auth from '@/store/modules/auth';
import pockemons from '@/store/modules/pockemons';
import { buildings } from '@/store/modules/buildings';
import { divisions } from '@/store/modules/divisions';
import { healthOrganizations } from '@/store/modules/healthOrganizations';
import { users } from '@/store/modules/users';
// import { likes } from '@/store/modules/likes';
import { news } from '@/store/modules/news';
import { normativeDocuments } from '@/store/modules/normativeDocuments';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'main-layout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    auth,
    buildings,
    divisions,
    healthOrganizations,
    // likes,
    news,
    normativeDocuments,
    users,
    pockemons,
  },
};

export default new Vuex.Store<RootState>(store);
