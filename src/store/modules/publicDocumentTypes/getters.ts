import { GetterTree } from 'vuex';

import IPublicDocumentType from '@/interfaces/document/IPublicDocumentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPublicDocumentType[] {
    return state.items;
  },
  item(state): IPublicDocumentType {
    return state.item;
  },
};

export default getters;
