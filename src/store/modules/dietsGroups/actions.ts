import { ActionTree } from 'vuex';

import IDietGroup from '@/interfaces/IDietGroup';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('diets-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDietGroup[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDietGroup>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDietGroup): Promise<void> => {
    await httpClient.post<IDietGroup, IDietGroup>({
      payload: item,
    });
  },
  update: async (_, item: IDietGroup): Promise<void> => {
    await httpClient.put<IDietGroup, IDietGroup>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
