import { ActionTree } from 'vuex';

import Project from '@/classes/Project';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('projects');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Project, State>(httpClient),
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<Project>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
