import { ActionTree } from 'vuex';

import IPaidProgram from '@/interfaces/IPaidProgram';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('paid-programs');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, limit): Promise<void> => {
    commit('setAll', await httpClient.get<IPaidProgram[]>({ query: limit ? `?limit=${limit}` : '' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IPaidProgram>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IPaidProgram): Promise<void> => {
    await httpClient.post<IPaidProgram, IPaidProgram>({ payload: item, fileInfos: [], isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IPaidProgram): Promise<void> => {
    await httpClient.put<IPaidProgram, IPaidProgram>({ query: `${item.id}`, payload: item, fileInfos: [], isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
