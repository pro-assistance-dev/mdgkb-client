import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import IBuilding from '@/interfaces/buildings/IBuilding';

const httpClient = new HttpClient('dictionary/buildings');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IBuilding[]>());
  },
  get: async ({ commit }, id: number) => {
    commit('set', await httpClient.get<IBuilding>({ query: `${id}?fields=*.*.*` }));
  },
};

export default actions;
