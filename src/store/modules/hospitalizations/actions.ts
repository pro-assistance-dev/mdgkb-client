import { ActionTree } from 'vuex';

import IHospitalizationType from '@/interfaces/IHospitalizationType';
import HttpClient from '@/services/HttpClient';
import hospitalizations from '@/store/modules/hospitalizations/hospitalisationsData';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('hospitalizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', hospitalizations);
  },
  pdf: async (_, id: string): Promise<void> => {
    await httpClient.get<IHospitalizationType>({
      query: `pdf/${id}`,
      isBlob: true,
    });
  },
};

export default actions;
