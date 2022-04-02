import { MutationTree } from 'vuex';

import CandidateDocumentType from '@/classes/CandidateDocumentType';
import ICandidateDocumentType from '@/interfaces/ICandidateDocumentType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICandidateDocumentType[]) {
    state.items = items.map((i: ICandidateDocumentType) => new CandidateDocumentType(i));
  },
  appendToAll(state, items: ICandidateDocumentType[]) {
    const itemsForAdding = items.map((i: ICandidateDocumentType) => new CandidateDocumentType(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: ICandidateDocumentType) {
    state.item = new CandidateDocumentType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ICandidateDocumentType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new CandidateDocumentType();
  },
};

export default mutations;
