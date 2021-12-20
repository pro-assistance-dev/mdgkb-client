import Vuex, { StoreOptions } from 'vuex';

import { admin } from '@/store/modules/admin';
import auth from '@/store/modules/auth';
import { banners } from '@/store/modules/banners';
import { buildings } from '@/store/modules/buildings';
import comments from '@/store/modules/comments';
import { cropper } from '@/store/modules/cropper';
import { divisions } from '@/store/modules/divisions';
import { doctors } from '@/store/modules/doctors';
import { documentTypes } from '@/store/modules/documentTypes';
import { educationalOrganization } from '@/store/modules/educationalOrganization';
import { events } from '@/store/modules/events';
import { faqs } from '@/store/modules/faqs';
import { heads } from '@/store/modules/heads';
import { hospitalizations } from '@/store/modules/hospitalizations';
import { map } from '@/store/modules/map';
import { menus } from '@/store/modules/menus';
import { news } from '@/store/modules/news';
import { newsSlides } from '@/store/modules/newsSlides';
import normativeDocuments from '@/store/modules/normativeDocuments';
import normativeDocumentTypes from '@/store/modules/normativeDocumentTypes';
import { pages } from '@/store/modules/pages';
import { projects } from '@/store/modules/projects';
import { questions } from '@/store/modules/questions';
import search from '@/store/modules/search';
import { sideOrganizations } from '@/store/modules/sideOrganizations';
import { tags } from '@/store/modules/tags';
import { timetablePatterns } from '@/store/modules/timetablePatterns';
import { timetables } from '@/store/modules/timetables';
import { users } from '@/store/modules/users';
import { vacancies } from '@/store/modules/vacancies';
import { vacancyResponses } from '@/store/modules/vacancyResponses';
import { valueTypes } from '@/store/modules/valueTypes';
import { visitingRules } from '@/store/modules/visitingRules';

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
    documentTypes,
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
    timetables,
    map,
    educationalOrganization,
    menus,
    pages,
    vacancies,
    vacancyResponses,
    search,
    hospitalizations,
    comments,
    faqs,
    newsSlides,
    questions,
    events,
    timetablePatterns,
    heads,
    visitingRules,
    projects,
  },
};

export default new Vuex.Store<RootState>(store);
