import { ActionTree } from 'vuex';

import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('daily-menu-orders');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDailyMenuOrder[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDailyMenuOrder>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDailyMenuOrder): Promise<void> => {
    await httpClient.post<IDailyMenuOrder, IDailyMenuOrder>({
      payload: item,
    });
  },
  update: async (_, item: IDailyMenuOrder): Promise<void> => {
    await httpClient.put<IDailyMenuOrder, IDailyMenuOrder>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
