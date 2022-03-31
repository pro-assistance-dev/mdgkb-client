import { MutationTree } from 'vuex';

import DpoDocumentType from '@/classes/DpoDocumentType';
import IDpoDocumentType from '@/interfaces/IDpoDocumentType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDpoDocumentType[]) {
    state.items = items.map((i: IDpoDocumentType) => new DpoDocumentType(i));
  },
  appendToAll(state, items: IDpoDocumentType[]) {
    const itemsForAdding = items.map((i: IDpoDocumentType) => new DpoDocumentType(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IDpoDocumentType) {
    state.item = new DpoDocumentType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDpoDocumentType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DpoDocumentType();
  },
};

export default mutations;
