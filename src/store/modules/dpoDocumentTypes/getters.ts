import { GetterTree } from 'vuex';

import IDpoDocumentType from '@/interfaces/IDpoDocumentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDpoDocumentType[] {
    return state.items;
  },
  item(state): IDpoDocumentType {
    return state.item;
  },
};

export default getters;
