import { ActionTree } from 'vuex';

import IHospitalizationType from '@/interfaces/IHospitalizationType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('hospitalizations-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    const items = await httpClient.get<IHospitalizationType>({ query: '' });
    commit('setAll', items);
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IHospitalizationType>({ query: `${id}` }));
  },
  update: async ({ state }): Promise<void> => {
    await httpClient.put<IHospitalizationType, IHospitalizationType>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
    });
  },
};

export default actions;
