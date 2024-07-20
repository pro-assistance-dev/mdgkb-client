import Vuex, { StoreOptions } from 'vuex';

import User from '@/classes/User';
import * as lib from '@/services/store/index';
import { authStateConstructor } from '@/services/store/modules/auth';
import { formStatuses } from '@/store/modules/formStatuses';
import { formValues } from '@/store/modules/formValues';
import { pagination } from '@/store/modules/pagination';
import { residencyApplications } from '@/store/modules/residencyApplications';
import { residencyCourses } from '@/store/modules/residencyCourses';

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
    pagination,
    residencyCourses,
    formStatuses,
    formValues,
    residencyApplications,
    ...lib,
  },
};

export default new Vuex.Store<RootState>(s);
