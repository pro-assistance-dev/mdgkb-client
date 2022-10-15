import { GetterTree } from 'vuex';

import IEducationDocumentType from '@/interfaces/IEducationDocumentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IEducationDocumentType[] {
    return state.items;
  },
  itemsForDelete(state): string[] {
    return state.itemsForDelete;
  },
  item(state): IEducationDocumentType {
    return state.item;
  },
};

export default getters;
