import { ActionTree } from 'vuex';

import IHospitalization from '@/interfaces/hospitalizatoins/IHospitalization';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('hospitalizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IHospitalization[]>());
  },
};

export default actions;
