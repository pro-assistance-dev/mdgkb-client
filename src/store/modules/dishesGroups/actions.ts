import { ActionTree } from 'vuex';

import IDishesGroup from '@/interfaces/IDishesGroup';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('DishesGroups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDishesGroup[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDishesGroup>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDishesGroup): Promise<void> => {
    await httpClient.post<IDishesGroup, IDishesGroup>({
      payload: item,
    });
  },
  update: async (_, item: IDishesGroup): Promise<void> => {
    await httpClient.put<IDishesGroup, IDishesGroup>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
