import { ActionTree } from 'vuex';

import IAppointment from '@/interfaces/IAppointment';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('appointments');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IAppointment[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IAppointment[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<IAppointment, IAppointment>({ payload: state.item, isFormData: true });
    commit('resetItem');
  },
  init: async ({ state, commit }): Promise<void> => {
    await httpClient.get<IAppointment[]>({ query: 'init' });
    commit('resetItem');
  },
  update: async ({ commit, state }): Promise<void> => {
    const res = await httpClient.put<IAppointment, IAppointment>({ query: `${state.item.id}`, payload: state.item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IAppointment>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
