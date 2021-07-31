import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import State from './state';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';

const getters: GetterTree<State, RootState> = {
  document(state): INormativeDocument | undefined {
    return state.document;
  },
  documents(state): INormativeDocument[] | undefined {
    return state.documents;
  },
};

export default getters;
