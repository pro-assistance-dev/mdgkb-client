import { GetterTree } from 'vuex';

import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  type(state): INormativeDocumentType | undefined {
    return state.type;
  },
  types(state): INormativeDocumentType[] | undefined {
    return state.types;
  },
};

export default getters;
