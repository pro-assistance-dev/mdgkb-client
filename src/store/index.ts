import Vuex, { StoreOptions } from 'vuex';

import User from '@/classes/User';
import * as lib from '@/services/store/index';
import { authStateConstructor } from '@/services/store/modules/auth';
import { cropper } from '@/store/modules/cropper';
import { formPatterns } from '@/store/modules/formPatterns';
import { formStatuses } from '@/store/modules/formStatuses';
import { formStatusGroups } from '@/store/modules/formStatusGroups';
import { formValues } from '@/store/modules/formValues';
import { pagination } from '@/store/modules/pagination';
import { pointsAchievements } from '@/store/modules/pointsAchievements';
import { residencyApplications } from '@/store/modules/residencyApplications';
import { residencyCourses } from '@/store/modules/residencyCourses';
import search from '@/store/modules/search';
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
    users,
    search,
    pagination,
    formPatterns,
    residencyCourses,
    formStatuses,
    formValues,
    residencyApplications,
    formStatusGroups,
    pointsAchievements,
    ...lib,
  },
};

export default new Vuex.Store<RootState>(s);
