import { GetterTree } from 'vuex';

import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  document(state): INormativeDocument | undefined {
    return state.document;
  },
  documents(state): INormativeDocument[] | undefined {
    return state.documents;
  },
};

export default getters;
