import { GetterTree } from 'vuex';

import ICertificate from '@/interfaces/ICertificate';
import ICertificatesWithDeleted from '@/interfaces/ICertificatesWithDeleted';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ICertificatesWithDeleted {
    return state.items;
  },
  donorRules(state): ICertificate[] {
    return state.items.certificates;
  },
};

export default getters;
