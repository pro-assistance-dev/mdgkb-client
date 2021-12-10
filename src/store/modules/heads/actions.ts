import { ActionTree } from 'vuex';

import IHead from '@/interfaces/IHead';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('heads');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, limit): Promise<void> => {
    commit('setAll', await httpClient.get<IHead[]>({ query: limit ? `?limit=${limit}` : '' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IHead>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IHead): Promise<void> => {
    await httpClient.post<IHead, IHead>({ payload: item, fileInfos: [item.photo], isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IHead): Promise<void> => {
    await httpClient.put<IHead, IHead>({ query: `${item.id}`, payload: item, fileInfos: [item.photo], isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
