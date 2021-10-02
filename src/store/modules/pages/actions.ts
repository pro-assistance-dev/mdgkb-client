import { ActionTree } from 'vuex';

import IMenu from '@/interfaces/menu/IMenu';
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
  create: async ({ commit }, menu: IMenu): Promise<void> => {
    await httpClient.post<IMenu, IMenu>({ payload: menu });
    commit('set');
  },
  update: async ({ commit }, menu: IMenu): Promise<void> => {
    await httpClient.put<IMenu, IMenu>({
      query: `${menu.id}`,
      payload: menu,
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },

  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    console.log(slug);
    const res = await httpClient.get<IPage>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
