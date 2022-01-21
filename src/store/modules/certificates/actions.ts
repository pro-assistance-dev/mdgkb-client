import { ActionTree } from 'vuex';

import ICertificate from '@/interfaces/ICertificate';
import ICertificatesWithDeleted from '@/interfaces/ICertificatesWithDeleted';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('certificates');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ICertificate[]>());
  },
  updateMany: async ({ commit, state }): Promise<void> => {
    commit(
      'setAll',
      await httpClient.put<ICertificatesWithDeleted, ICertificatesWithDeleted>({
        payload: state.items,
        fileInfos: state.items.getFileInfos(),
        isFormData: true,
      })
    );
  },
};

export default actions;
