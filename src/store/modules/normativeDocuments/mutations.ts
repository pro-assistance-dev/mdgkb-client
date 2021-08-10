import { MutationTree } from 'vuex';

import NormativeDocument from '@/classes/normativeDocument/NormativeDocument';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';

import State from './state';

const mutations: MutationTree<State> = {
  set(state, document: INormativeDocument) {
    state.document = new NormativeDocument(document);
  },
  setAll(state, documents: INormativeDocument[]) {
    state.documents = documents.map((document: INormativeDocument) => new NormativeDocument(document));
  },
};

export default mutations;
