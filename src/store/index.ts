import Vuex, { StoreOptions } from 'vuex';

import User from '@/classes/User';
import * as lib from '@/services/store/index';
import { authStateConstructor } from '@/services/store/modules/auth';
import { appointments } from '@/store/modules/appointments';
import { appointmentsTypes } from '@/store/modules/appointmentsTypes';
import { candidateApplications } from '@/store/modules/candidateApplications';
import { candidateExams } from '@/store/modules/candidateExams';
import { chatMessages } from '@/store/modules/chatMessages';
import { chats } from '@/store/modules/chats';
import { cropper } from '@/store/modules/cropper';
import { dailyMenuOrders } from '@/store/modules/dailyMenuOrders';
import { dailyMenus } from '@/store/modules/dailyMenus';
import { dailyMenuItems } from '@/store/modules/dailyMenusItems';
import dataExport from '@/store/modules/dataExport';
import { dishesGroups } from '@/store/modules/dishesGroups';
import { dishesSamples } from '@/store/modules/dishesSamples';
import { doctors } from '@/store/modules/doctors';
import { dpoApplications } from '@/store/modules/dpoApplications';
import { educationalManagers } from '@/store/modules/educationalManagers';
import { educationYears } from '@/store/modules/educationYears';
import { events } from '@/store/modules/events';
import { fileInfos } from '@/store/modules/fileInfos';
import { formPatterns } from '@/store/modules/formPatterns';
import { formStatuses } from '@/store/modules/formStatuses';
import { formStatusGroups } from '@/store/modules/formStatusGroups';
import { formValues } from '@/store/modules/formValues';
import { meta } from '@/store/modules/meta';
import { newsSlides } from '@/store/modules/newsSlides';
import { pagination } from '@/store/modules/pagination';
import { pointsAchievements } from '@/store/modules/pointsAchievements';
import { postgraduateApplications } from '@/store/modules/postgraduateApplications';
import { postgraduateCourses } from '@/store/modules/postgraduateCourses';
import { residencyApplications } from '@/store/modules/residencyApplications';
import { residencyCourses } from '@/store/modules/residencyCourses';
import search from '@/store/modules/search';
import { specializations } from '@/store/modules/specializations';
import { tags } from '@/store/modules/tags';
import { users } from '@/store/modules/users';

import RootState from './types';

const s: StoreOptions<RootState> = {
  state: {
    layout: 'mainLayout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    // auth,
    auth: authStateConstructor(User),
    cropper,
    doctors,
    tags,
    users,
    search,
    newsSlides,
    events,
    meta,
    pagination,
    appointments,
    educationalManagers,
    specializations,
    dpoApplications,
    formPatterns,
    postgraduateCourses,
    postgraduateApplications,
    candidateExams,
    candidateApplications,
    residencyCourses,
    formStatuses,
    educationYears,
    formValues,
    residencyApplications,
    formStatusGroups,
    pointsAchievements,
    dishesGroups,
    dailyMenus,
    dishesSamples,
    dailyMenuItems,
    appointmentsTypes,
    dailyMenuOrders,
    chats,
    chatMessages,
    fileInfos,
    dataExport,
    ...lib,
  },
};

export default new Vuex.Store<RootState>(s);
