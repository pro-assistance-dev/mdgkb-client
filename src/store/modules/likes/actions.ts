import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('like');

const actions: ActionTree<State, RootState> = {
  create: async ({ commit }, newsId: string): Promise<void> => {
      const res = await httpClient.post({query: `news/${newsId}`})
      commit('setLikeNews', res.data);
  },
};

export default actions;
