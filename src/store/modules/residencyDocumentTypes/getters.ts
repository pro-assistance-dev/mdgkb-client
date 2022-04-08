import { GetterTree } from 'vuex';

import IResidencyDocumentType from '@/interfaces/IResidencyDocumentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IResidencyDocumentType[] {
    return state.items;
  },
  item(state): IResidencyDocumentType {
    return state.item;
  },
};

export default getters;
