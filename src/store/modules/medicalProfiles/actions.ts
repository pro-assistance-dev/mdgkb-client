import { ActionTree } from 'vuex';

import IMedicalProfile from '@/interfaces/IMedicalProfile';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('medical-profiles');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, limit): Promise<void> => {
    commit('setAll', await httpClient.get<IMedicalProfile[]>({ query: limit ? `?limit=${limit}` : '' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IMedicalProfile>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IMedicalProfile): Promise<void> => {
    await httpClient.post<IMedicalProfile, IMedicalProfile>({ payload: item, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IMedicalProfile): Promise<void> => {
    await httpClient.put<IMedicalProfile, IMedicalProfile>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
