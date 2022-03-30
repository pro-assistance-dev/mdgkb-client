import { MutationTree } from 'vuex';

import PostgraduateDocumentType from '@/classes/PostgraduateDocumentType';
import IPostgraduateDocumentType from '@/interfaces/IPostgraduateDocumentType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPostgraduateDocumentType[]) {
    state.items = items.map((i: IPostgraduateDocumentType) => new PostgraduateDocumentType(i));
  },
  appendToAll(state, items: IPostgraduateDocumentType[]) {
    const itemsForAdding = items.map((i: IPostgraduateDocumentType) => new PostgraduateDocumentType(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IPostgraduateDocumentType) {
    state.item = new PostgraduateDocumentType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPostgraduateDocumentType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new PostgraduateDocumentType();
  },
};

export default mutations;
