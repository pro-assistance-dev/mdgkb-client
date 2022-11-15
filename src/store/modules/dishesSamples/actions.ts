import { ActionTree } from 'vuex';

import IDishSample from '@/interfaces/IDishSample';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('DishesSamples');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDishSample[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDishSample>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDishSample): Promise<void> => {
    await httpClient.post<IDishSample, IDishSample>({
      payload: item,
    });
  },
  update: async (_, item: IDishSample): Promise<void> => {
    await httpClient.put<IDishSample, IDishSample>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
