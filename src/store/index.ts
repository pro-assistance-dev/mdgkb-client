import Vuex, { StoreOptions } from 'vuex';

import RootState from './types';
import auth from '@/store/modules/auth';
import normativeDocumentTypes from '@/store/modules/normativeDocumentTypes';
import normativeDocuments from '@/store/modules/normativeDocuments';
import pockemons from '@/store/modules/pockemons';
import { admin } from '@/store/modules/admin';
import { buildings } from '@/store/modules/buildings';
import { carousels } from '@/store/modules/carousels';
import { divisions } from '@/store/modules/divisions';
import { doctors } from '@/store/modules/doctors';
import { news } from '@/store/modules/news';
import { sideOrganizations } from '@/store/modules/sideOrganizations';
import { tags } from '@/store/modules/tags';
import { users } from '@/store/modules/users';

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
    doctors,
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
