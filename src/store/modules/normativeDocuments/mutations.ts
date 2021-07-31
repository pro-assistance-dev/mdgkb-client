import { MutationTree } from 'vuex';

import State from './state';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';
import NormativeDocument from '@/classes/normativeDocument/NormativeDocument';

const mutations: MutationTree<State> = {
  set(state, document: INormativeDocument) {
    state.document = new NormativeDocument(document);
  },
  setAll(state, documents: INormativeDocument[]) {
    state.documents = documents.map((document: INormativeDocument) => new NormativeDocument(document));
  },
};

export default mutations;
