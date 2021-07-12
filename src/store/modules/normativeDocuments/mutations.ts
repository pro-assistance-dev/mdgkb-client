import { MutationTree } from 'vuex';

import { State } from './state';
import INormativeDocument from "@/interfaces/normativeDocument/INormativeDocument";
import NormativeDocument from "@/classes/normativeDocument/NormativeDocument";

const mutations: MutationTree<State> = {
  setAll(state, items: INormativeDocument[]) {
    state.documents = items.map((i: INormativeDocument) => new NormativeDocument(i));
  },
};

export default mutations;
