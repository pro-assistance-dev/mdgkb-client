import { ActionTree } from 'vuex';

import IMenu from '@/interfaces/IMenu';
import IMenusWithDeleted from '@/interfaces/IMenusWithDeleted';
import INews from '@/interfaces/news/INews';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('menus');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IMenu[]>());
  },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `${slug}` });
    commit('set', res);
  },
  create: async ({ commit }, menu: IMenu): Promise<void> => {
    await httpClient.post<IMenu, IMenu>({
      payload: menu,
      fileInfos: menu.getFileInfos(),
      isFormData: true,
    });
    commit('set');
  },
  update: async ({ commit }, menu: IMenu): Promise<void> => {
    await httpClient.put<IMenu, IMenu>({
      query: `${menu.id}`,
      payload: menu,
      fileInfos: menu.getFileInfos(),
      isFormData: true,
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },

  updateAll: async ({ commit }, items: IMenu[]): Promise<void> => {
    await httpClient.put<IMenu[], IMenu[]>({ payload: items });
    commit('set');
  },
  updateMany: async ({ commit, state }): Promise<void> => {
    commit(
      'setAll',
      await httpClient.put<IMenusWithDeleted, IMenusWithDeleted>({
        payload: { menus: state.items, menusForDeleted: state.itemsForDelete },
        fileInfos: [],
        isFormData: true,
      })
    );
  },
};

export default actions;
