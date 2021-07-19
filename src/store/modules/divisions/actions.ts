import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import IDivision from '@/interfaces/divisions/IDivision';

const httpClient = new HttpClient('dictionary/divisions');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDivision[]>());
  },
  get: async ({ commit }, id: number) => {
    commit('set', await httpClient.get<IDivision>({ query: `${id}?fields=*.*.*` }));
  },
};

export default actions;
