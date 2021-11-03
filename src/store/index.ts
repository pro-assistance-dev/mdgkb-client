import Vuex, { StoreOptions } from 'vuex';

import { admin } from '@/store/modules/admin';
import auth from '@/store/modules/auth';
import { banners } from '@/store/modules/banners';
import { buildings } from '@/store/modules/buildings';
import { carousels } from '@/store/modules/carousels';
import { cropper } from '@/store/modules/cropper';
import { divisions } from '@/store/modules/divisions';
import { doctors } from '@/store/modules/doctors';
import { documents } from '@/store/modules/documents';
import { educationalOrganization } from '@/store/modules/educationalOrganization';
import { map } from '@/store/modules/map';
import { menus } from '@/store/modules/menus';
import { news } from '@/store/modules/news';
import normativeDocuments from '@/store/modules/normativeDocuments';
import normativeDocumentTypes from '@/store/modules/normativeDocumentTypes';
import { pages } from '@/store/modules/pages';
import { sideOrganizations } from '@/store/modules/sideOrganizations';
import { tags } from '@/store/modules/tags';
import { timetables } from '@/store/modules/timetables';
import { users } from '@/store/modules/users';
import { vacancies } from '@/store/modules/vacancies';
import { vacancyResponses } from '@/store/modules/vacancyResponses';
import { valueTypes } from '@/store/modules/valueTypes';

import RootState from './types';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'mainLayout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    valueTypes,
    documents,
    auth,
    banners,
    cropper,
    buildings,
    divisions,
    doctors,
    sideOrganizations,
    tags,
    news,
    normativeDocuments,
    normativeDocumentTypes,
    users,
    admin,
    carousels,
    timetables,
    map,
    educationalOrganization,
    menus,
    pages,
    vacancies,
    vacancyResponses,
  },
};

export default new Vuex.Store<RootState>(store);
