import { ActionTree } from 'vuex';

import IPage from '@/interfaces/page/IPage';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('pages');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IPage[]>());
  },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IPage>({ query: `${slug}` });
    commit('set', res);
  },
  create: async ({ commit }, page: IPage): Promise<void> => {
    await httpClient.post<IPage, IPage>({ payload: page, fileInfos: page.getFileInfos(), isFormData: true });
    commit('set');
  },
  update: async ({ commit }, page: IPage): Promise<void> => {
    await httpClient.put<IPage, IPage>({
      query: `${page.id}`,
      payload: page,
      fileInfos: page.getFileInfos(),
      isFormData: true,
    });
    commit('set', page);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IPage>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
