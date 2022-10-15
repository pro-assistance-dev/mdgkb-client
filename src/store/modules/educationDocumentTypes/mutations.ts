import { MutationTree } from 'vuex';

import EducationDocumentType from '@/classes/EducationDocumentType';
import IEducationDocumentType from '@/interfaces/IEducationDocumentType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IEducationDocumentType[]) {
    state.items = items.map((i: IEducationDocumentType) => new EducationDocumentType(i));
  },
  appendToAll(state, items: IEducationDocumentType[]) {
    const itemsForAdding = items.map((i: IEducationDocumentType) => new EducationDocumentType(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IEducationDocumentType) {
    state.item = new EducationDocumentType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IEducationDocumentType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new EducationDocumentType();
  },
  setDefaultOder(state) {
    if (state.items.length) {
      state.item.order = state.items.length - 1;
    }
  },
};

export default mutations;
