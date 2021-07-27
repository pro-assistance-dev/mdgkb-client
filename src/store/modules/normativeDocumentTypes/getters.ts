import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import State from './state';
import INormativeDocumentType from '@/interfaces/normativeDocument/INormativeDocumentType';

const getters: GetterTree<State, RootState> = {
  type(state): INormativeDocumentType | undefined {
    return state.type;
  },
  types(state): INormativeDocumentType[] | undefined {
    return state.types;
  },
};

export default getters;
