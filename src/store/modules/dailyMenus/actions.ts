import { ActionTree } from 'vuex';

import IDailyMenu from '@/interfaces/IDailyMenu';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('daily-menus');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDailyMenu[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDailyMenu>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDailyMenu): Promise<void> => {
    const res = await httpClient.post<IDailyMenu, IDailyMenu>({
      payload: item,
      isFormData: true,
    });
    if (res) {
      item.id = res.id;
    }
  },
  update: async (_, item: IDailyMenu): Promise<void> => {
    await httpClient.put<IDailyMenu, IDailyMenu>({ query: `${item.id}`, payload: item, isFormData: true });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  pdf: async (_, item: IDailyMenu): Promise<void> => {
    await httpClient.post<IDailyMenu, IDailyMenu>({
      query: `pdf`,
      payload: item,
      isBlob: true,
      isFormData: true,
      downloadFileName: 'Меню.pdf',
    });
  },
};

export default actions;
