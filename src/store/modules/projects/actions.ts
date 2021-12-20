import { ActionTree } from 'vuex';

import IProject from '@/interfaces/projects/IProject';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('projects');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IProject[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IProject[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: IProject): Promise<void> => {
    const res = await httpClient.post<IProject, IProject>({
      payload: item,
    });
    commit('set', res);
  },
  update: async ({ commit }, item: IProject): Promise<void> => {
    const res = await httpClient.put<IProject, IProject>({ query: `${item.id}`, payload: item });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IProject>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
