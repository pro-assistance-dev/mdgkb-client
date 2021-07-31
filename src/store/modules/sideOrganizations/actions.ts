import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';

const httpClient = new HttpClient('side-organizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ISideOrganization[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<ISideOrganization>({ query: `${id}` }));
  },
  create: async ({ commit }, sideOrganization: ISideOrganization): Promise<void> => {
    await httpClient.post<ISideOrganization, ISideOrganization>({ payload: sideOrganization });
    commit('set');
  },
  update: async ({ commit }, sideOrganization: ISideOrganization): Promise<void> => {
    await httpClient.put<ISideOrganization, ISideOrganization>({ query: `${sideOrganization.id}`, payload: sideOrganization });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
