import { ActionTree } from 'vuex';

import IHospitalizationType from '@/interfaces/IHospitalizationType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('hospitalizations-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    const items = await httpClient.get<IHospitalizationType>({ query: '' });
    console.log(items);
    commit('setAll', items);
  },
};

export default actions;
