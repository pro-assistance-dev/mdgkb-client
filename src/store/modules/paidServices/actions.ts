import { ActionTree } from 'vuex';

import IPaidService from '@/interfaces/IPaidService';
import ISearch from '@/interfaces/ISearch';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('paid-services');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, limit): Promise<void> => {
    commit('setAll', await httpClient.get<IPaidService[]>({ query: limit ? `?limit=${limit}` : '' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IPaidService>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IPaidService): Promise<void> => {
    await httpClient.post<IPaidService, IPaidService>({ payload: item, fileInfos: [], isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IPaidService): Promise<void> => {
    await httpClient.put<IPaidService, IPaidService>({ query: `${item.id}`, payload: item, fileInfos: [], isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },

  search: async ({ commit }, search: ISearch): Promise<void> => {
    const items = await httpClient.get<IPaidService[]>({ query: `search?query=${search.query}` });
    if (items) {
      items.forEach((i: IPaidService) => {
        if (i.id) {
          search.searchObjects.push({ value: `${i.name}`, id: i.id });
        }
      });
    }
  },
  getAllById: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPaidService>({ query: id });
    commit('setAll', { paidService: [res], count: 1 });
  },
};

export default actions;
