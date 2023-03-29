import { ActionTree } from 'vuex';

import IMenusWithDeleted from '@/interfaces/IMenusWithDeleted';
import Menu from '@/services/classes/Menu';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('menus');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<Menu[]>());
  },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<Menu>({ query: `${slug}` });
    commit('set', res);
  },
  create: async ({ commit }, menu: Menu): Promise<void> => {
    await httpClient.post<Menu, Menu>({
      payload: menu,
      fileInfos: menu.getFileInfos(),
      isFormData: true,
    });
    commit('set');
  },
  update: async ({ commit }, menu: Menu): Promise<void> => {
    await httpClient.put<Menu, Menu>({
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

  updateAll: async ({ commit }, items: Menu[]): Promise<void> => {
    await httpClient.put<Menu[], Menu[]>({ payload: items });
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
