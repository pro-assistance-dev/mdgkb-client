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
  update: async ({ commit }, item: IAppointment): Promise<void> => {
    const res = await httpClient.put<IAppointment, IAppointment>({ query: `${item.id}`, payload: item });
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
