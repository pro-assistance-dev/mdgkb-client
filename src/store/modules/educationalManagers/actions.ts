import { ActionTree } from 'vuex';

import IEducationalManager from '@/interfaces/IEducationalManager';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('educational-managers');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IEducationalManager[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IEducationalManager[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<IEducationalManager, IEducationalManager>({ payload: state.item, isFormData: true });
    commit('resetItem');
  },
  update: async ({ commit }, item: IEducationalManager): Promise<void> => {
    const res = await httpClient.put<IEducationalManager, IEducationalManager>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IEducationalManager>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
