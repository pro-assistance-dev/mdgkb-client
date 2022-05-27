import { MutationTree } from 'vuex';

import AdmissionCommitteeDocumentType from '@/classes/AdmissionCommitteeDocumentType';
import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IAdmissionCommitteeDocumentType[]) {
    state.items = items.map((i: IAdmissionCommitteeDocumentType) => new AdmissionCommitteeDocumentType(i));
  },
  appendToAll(state, items: IAdmissionCommitteeDocumentType[]) {
    const itemsForAdding = items.map((i: IAdmissionCommitteeDocumentType) => new AdmissionCommitteeDocumentType(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IAdmissionCommitteeDocumentType) {
    state.item = new AdmissionCommitteeDocumentType(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IAdmissionCommitteeDocumentType) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new AdmissionCommitteeDocumentType();
  },
};

export default mutations;
