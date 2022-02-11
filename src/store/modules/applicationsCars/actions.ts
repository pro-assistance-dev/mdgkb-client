import { ActionTree } from 'vuex';

import IApplicationCar from '@/interfaces/IApplicationCar';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('projects');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IApplicationCar[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IApplicationCar[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: IApplicationCar): Promise<void> => {
    const res = await httpClient.post<IApplicationCar, IApplicationCar>({
      payload: item,
    });
    commit('set', res);
  },
  update: async ({ commit }, item: IApplicationCar): Promise<void> => {
    const res = await httpClient.put<IApplicationCar, IApplicationCar>({ query: `${item.id}`, payload: item });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IApplicationCar>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
