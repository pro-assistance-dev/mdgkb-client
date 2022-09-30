import { ActionTree } from 'vuex';

import IDiet from '@/interfaces/IDiet';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('diets');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDiet[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDiet>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDiet): Promise<void> => {
    await httpClient.post<IDiet, IDiet>({
      payload: item,
    });
  },
  update: async (_, item: IDiet): Promise<void> => {
    await httpClient.put<IDiet, IDiet>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
