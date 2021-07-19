import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import INormativeDocument from '@/interfaces/normativeDocument/INormativeDocument';

const httpClient = new HttpClient('dictionary/normative_documents');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<INormativeDocument[]>());
  },
};

export default actions;
