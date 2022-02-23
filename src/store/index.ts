import Vuex, { StoreOptions } from 'vuex';

import { admin } from '@/store/modules/admin';
import { applicationsCars } from '@/store/modules/applicationsCars';
import auth from '@/store/modules/auth';
import { banners } from '@/store/modules/banners';
import { buildings } from '@/store/modules/buildings';
import { callbacks } from '@/store/modules/callbacks';
import { certificates } from '@/store/modules/certificates';
import comments from '@/store/modules/comments';
import { cropper } from '@/store/modules/cropper';
import { divisions } from '@/store/modules/divisions';
import { doctors } from '@/store/modules/doctors';
import { documentTypes } from '@/store/modules/documentTypes';
import { donorRules } from '@/store/modules/donorRules';
import { educationalOrganization } from '@/store/modules/educationalOrganization';
import { entrances } from '@/store/modules/entrances';
import { events } from '@/store/modules/events';
import { faqs } from '@/store/modules/faqs';
import { filter } from '@/store/modules/filter';
import { heads } from '@/store/modules/heads';
import { hospitalizations } from '@/store/modules/hospitalizations';
import { map } from '@/store/modules/map';
import { medicalProfiles } from '@/store/modules/medicalProfiles';
import { menus } from '@/store/modules/menus';
import { meta } from '@/store/modules/meta';
import { news } from '@/store/modules/news';
import { newsSlides } from '@/store/modules/newsSlides';
import normativeDocuments from '@/store/modules/normativeDocuments';
import normativeDocumentTypes from '@/store/modules/normativeDocumentTypes';
import { pages } from '@/store/modules/pages';
import { pagination } from '@/store/modules/pagination';
import { paidPrograms } from '@/store/modules/paidPrograms';
import { paidProgramsGroups } from '@/store/modules/paidProgramsGroups';
import { partners } from '@/store/modules/partners';
import { partnerTypes } from '@/store/modules/partnerTypes';
import { preparations } from '@/store/modules/preparations';
import { projects } from '@/store/modules/projects';
import { publicDocumentTypes } from '@/store/modules/publicDocumentTypes';
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

const s: StoreOptions<RootState> = {
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
    paidProgramsGroups,
    visitingRules,
    projects,
    paidPrograms,
    partners,
    partnerTypes,
    preparations,
    donorRules,
    filter,
    meta,
    pagination,
    publicDocumentTypes,
    certificates,
    medicalProfiles,
    applicationsCars,
    callbacks,
    entrances,
  },
};

export default new Vuex.Store<RootState>(s);
