import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('news');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
      const res = await httpClient.get({query: 'items?fields=*&sort=-published_on&limit=12&page=1&meta=*'})
      commit('setAll', res.data);
  },
    get: async ({ commit }, slug: string): Promise<void> => {
        const res = await httpClient.get({query: `item/${slug}`})
        commit('set', res);
    },
};

export default actions;
