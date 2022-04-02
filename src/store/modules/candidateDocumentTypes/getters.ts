import { GetterTree } from 'vuex';

import ICandidateDocumentType from '@/interfaces/ICandidateDocumentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ICandidateDocumentType[] {
    return state.items;
  },
  item(state): ICandidateDocumentType {
    return state.item;
  },
};

export default getters;
