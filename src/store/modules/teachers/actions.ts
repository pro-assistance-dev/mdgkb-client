import { ActionTree } from 'vuex';

import ITeacher from '@/interfaces/educationalOrganization/ITeacher';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('teachers');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ITeacher[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<ITeacher[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<ITeacher, ITeacher>({ payload: state.item, isFormData: true });
    commit('resetItem');
  },
  update: async ({ commit }, item: ITeacher): Promise<void> => {
    const res = await httpClient.put<ITeacher, ITeacher>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<ITeacher>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
