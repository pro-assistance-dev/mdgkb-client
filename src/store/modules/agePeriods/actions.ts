import { ActionTree } from 'vuex';

import IAgePeriod from '@/interfaces/IAgePeriod';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('age-periods');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IAgePeriod[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IAgePeriod>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IAgePeriod): Promise<void> => {
    await httpClient.post<IAgePeriod, IAgePeriod>({
      payload: item,
    });
  },
  update: async (_, item: IAgePeriod): Promise<void> => {
    await httpClient.put<IAgePeriod, IAgePeriod>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
