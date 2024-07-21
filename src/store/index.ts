import Vuex, { StoreOptions } from 'vuex';

import { pagination } from '@/store/modules/pagination';

import RootState from './types';

const s: StoreOptions<RootState> = {
  state: {
    layout: 'mainLayout',
  },
  modules: {
    // auth,
    pagination,
  },
};

export default new Vuex.Store<RootState>(s);
