import { ActionTree } from 'vuex';

import IDailyMenu from '@/interfaces/IDailyMenu';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('DishesSamples');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDailyMenu[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDailyMenu>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDailyMenu): Promise<void> => {
    await httpClient.post<IDailyMenu, IDailyMenu>({
      payload: item,
    });
  },
  update: async (_, item: IDailyMenu): Promise<void> => {
    await httpClient.put<IDailyMenu, IDailyMenu>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
