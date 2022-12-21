import { ActionTree } from 'vuex';

import IDailyMenuItem from '@/interfaces/IDailyMenuItem';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('daily-menu-items');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDailyMenuItem[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDailyMenuItem>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDailyMenuItem): Promise<void> => {
    await httpClient.post<IDailyMenuItem, IDailyMenuItem>({
      payload: item,
    });
  },
  update: async (_, item: IDailyMenuItem): Promise<void> => {
    await httpClient.put<IDailyMenuItem, IDailyMenuItem>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
