import { GetterTree } from 'vuex';

import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IAdmissionCommitteeDocumentType[] {
    return state.items;
  },
  item(state): IAdmissionCommitteeDocumentType {
    return state.item;
  },
};

export default getters;
