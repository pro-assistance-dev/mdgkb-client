import Vuex, { StoreOptions } from 'vuex';

import RootState from './types';
import auth from '@/store/modules/auth';
import pockemons from '@/store/modules/pockemons';
import { buildings } from '@/store/modules/buildings';
import { divisions } from '@/store/modules/divisions';
import { sideOrganizations } from '@/store/modules/sideOrganizations';
import { users } from '@/store/modules/users';
import { tags } from '@/store/modules/tags';
import { news } from '@/store/modules/news';
import { normativeDocuments } from '@/store/modules/normativeDocuments';
import normativeDocumentTypes from '@/store/modules/normativeDocumentTypes';
import { admin } from '@/store/modules/admin';
import { carousels } from '@/store/modules/carousels';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'mainLayout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    auth,
    buildings,
    divisions,
    sideOrganizations,
    tags,
    news,
    normativeDocuments,
    normativeDocumentTypes,
    users,
    pockemons,
    admin,
    carousels,
  },
};

export default new Vuex.Store<RootState>(store);
