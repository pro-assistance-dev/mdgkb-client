import { MutationTree } from 'vuex';

import Certificate from '@/classes/Certificate';
import ICertificate from '@/interfaces/ICertificate';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICertificate[]) {
    state.items.certificates = items.map((i: ICertificate) => new Certificate(i));
    state.items.certificatesForDelete = [];
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
