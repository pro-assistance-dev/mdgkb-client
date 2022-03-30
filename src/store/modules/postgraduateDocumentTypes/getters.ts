import { GetterTree } from 'vuex';

import IPostgraduateDocumentType from '@/interfaces/IPostgraduateDocumentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPostgraduateDocumentType[] {
    return state.items;
  },
  item(state): IPostgraduateDocumentType {
    return state.item;
  },
};

export default getters;
