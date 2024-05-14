import { ActionTree } from 'vuex';

import Appointment from '@/classes/Appointment';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('appointments');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Appointment, State>(httpClient),
  init: async ({ commit }): Promise<void> => {
    await httpClient.get<Appointment[]>({ query: 'init' });
    commit('resetItem');
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<Appointment>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
