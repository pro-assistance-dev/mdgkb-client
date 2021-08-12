import { ActionTree } from 'vuex';

import IBanner from '@/interfaces/banners/IBanner';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('banners');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IBanner[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IBanner>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IBanner): Promise<void> => {
    await httpClient.post<IBanner, IBanner>({ payload: item, fileInfos: [item.fileInfo], isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IBanner): Promise<void> => {
    await httpClient.put<IBanner, IBanner>({ query: `${item.id}`, payload: item, fileInfos: [item.fileInfo], isFormData: true });
    commit('set');
  },
  updateAll: async ({ commit }, items: IBanner[]): Promise<void> => {
    await httpClient.put<IBanner[], IBanner[]>({ payload: items });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
