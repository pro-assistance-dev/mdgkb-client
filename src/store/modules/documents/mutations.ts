import { MutationTree } from 'vuex';

import Document from '@/classes/document/Document';
import IDocument from '@/interfaces/document/IDocument';

import State from './state';

const mutations: MutationTree<State> = {
  set(state, item: IDocument) {
    state.item = new Document(item);
  },
  setAll(state, documents: IDocument[]) {
    state.items = documents.map((document: IDocument) => new Document(document));
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDocument) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
