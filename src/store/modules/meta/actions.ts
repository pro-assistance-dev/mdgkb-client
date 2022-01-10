import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('meta');

const actions: ActionTree<State, RootState> = {
  getCount: async ({ commit }, table: string): Promise<void> => {
    commit('setCount', await httpClient.get<number>({ query: `count/${table}` }));
  },
  getSchema: async ({ commit }): Promise<void> => {
    const data = await httpClient.get<number>({ query: `schema` });
    commit('setSchema', data);
  },
};

export default actions;
