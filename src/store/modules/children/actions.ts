import { ActionTree } from 'vuex';

import Child from '@/classes/Child';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('children');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Child, State>(httpClient),
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<Child>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
