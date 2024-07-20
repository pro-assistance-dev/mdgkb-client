import Vuex, { StoreOptions } from 'vuex';

import User from '@/classes/User';
import * as lib from '@/services/store/index';
import { authStateConstructor } from '@/services/store/modules/auth';
import { pagination } from '@/store/modules/pagination';

import RootState from './types';

const s: StoreOptions<RootState> = {
  state: {
    layout: 'mainLayout',
  },
  modules: {
    // auth,
    auth: authStateConstructor(User),
    pagination,
    ...lib,
  },
};

export default new Vuex.Store<RootState>(s);
