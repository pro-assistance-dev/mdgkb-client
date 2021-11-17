import { ActionTree } from 'vuex';

import IHospitalization from '@/interfaces/hospitalizations/IHospitalization';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('hospitalizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IHospitalization[]>());
  },
  pdf: async (_, id: string): Promise<void> => {
    await httpClient.get<IHospitalization>({
      query: `pdf/${id}`,
      isBlob: true,
    });
  },
};

export default actions;
