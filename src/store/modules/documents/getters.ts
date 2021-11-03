import { GetterTree } from 'vuex';

import IDocument from '@/interfaces/document/IDocument';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  item(state): IDocument {
    return state.item;
  },
  items(state): IDocument[] {
    return state.items;
  },
};

export default getters;
