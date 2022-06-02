import { ActionTree } from 'vuex';

import ITreatDirection from '@/interfaces/ITreatDirection';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('treat-directions');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, limit): Promise<void> => {
    commit('setAll', await httpClient.get<ITreatDirection[]>({ query: limit ? `?limit=${limit}` : '' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<ITreatDirection>({ query: `${id}` }));
  },
  create: async ({ commit }, item: ITreatDirection): Promise<void> => {
    await httpClient.post<ITreatDirection, ITreatDirection>({ payload: item, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: ITreatDirection): Promise<void> => {
    await httpClient.put<ITreatDirection, ITreatDirection>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
