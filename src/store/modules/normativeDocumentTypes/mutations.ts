import { MutationTree } from 'vuex';

import NormativeDocumentType from '@/classes/normativeDocument/NormativeDocumentType';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

import State from './state';

const mutations: MutationTree<State> = {
  set(state, type: INormativeDocumentType) {
    state.type = new NormativeDocumentType(type);
  },
  setAll(state, types: INormativeDocumentType[]) {
    state.types = types.map((type: INormativeDocumentType) => new NormativeDocumentType(type));
  },
};

export default mutations;
