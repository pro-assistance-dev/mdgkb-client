import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import IDivision from '@/interfaces/buildings/IDivision';

const httpClient = new HttpClient('divisions');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDivision[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IDivision>({ query: `${id}` }));
  },
  create: async ({ commit }, division: IDivision): Promise<void> => {
    await httpClient.post<IDivision, IDivision>({ payload: division });
    commit('set');
  },
  update: async ({ commit }, division: IDivision): Promise<void> => {
    await httpClient.put<IDivision, IDivision>({ query: `${division.id}`, payload: division });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
