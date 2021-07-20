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
};

export default actions;
