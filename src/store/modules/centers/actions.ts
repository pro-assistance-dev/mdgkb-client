import { ActionTree } from 'vuex';

import ICenter from '@/interfaces/ICenter';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('centers');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ICenter[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<ICenter>({ query: `${id}` }));
  },
  create: async ({ commit }, item: ICenter): Promise<void> => {
    await httpClient.post<ICenter, ICenter>({ payload: item, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: ICenter): Promise<void> => {
    await httpClient.put<ICenter, ICenter>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
