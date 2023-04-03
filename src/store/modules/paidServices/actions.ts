import { ActionTree } from 'vuex';

import IPaidService from '@/interfaces/IPaidService';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('paid-services');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    commit('setAll', await httpClient.get<IPaidService[]>({ query: filterQuery ? filterQuery.toUrl() : '' }));
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPaidService>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IPaidService): Promise<void> => {
    await httpClient.post<IPaidService, IPaidService>({
      payload: item,
      isFormData: true,
    });
  },
  update: async ({ state }, item: IPaidService): Promise<void> => {
    await httpClient.put<IPaidService, IPaidService>({ query: `${item.id}`, payload: item, isFormData: true });
  },
  remove: async ({ state }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
  },
};

export default actions;
