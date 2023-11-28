import { ActionTree } from 'vuex';

import EducationYear from '@/classes/EducationYear';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('education-years');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<EducationYear, State>(httpClient),
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<EducationYear>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
