import { MutationTree } from 'vuex';

import ResidencyDocumentType from '@/classes/ResidencyDocumentType';
import IResidencyDocumentType from '@/interfaces/IResidencyDocumentType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IResidencyDocumentType[]) {
    state.items = items.map((i: IResidencyDocumentType) => new ResidencyDocumentType(i));
  },
  appendToAll(state, items: IResidencyDocumentType[]) {
    const itemsForAdding = items.map((i: IResidencyDocumentType) => new ResidencyDocumentType(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IResidencyDocumentType) {
    state.item = new ResidencyDocumentType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IResidencyDocumentType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new ResidencyDocumentType();
  },
};

export default mutations;
