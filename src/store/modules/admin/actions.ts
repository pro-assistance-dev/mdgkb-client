import { ActionTree } from 'vuex';

import IApplicationsCount from '@/interfaces/IApplicationsCount';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('dpo-applications');

const actions: ActionTree<State, RootState> = {
  subscribeApplicationsCountsGet: async ({ commit }): Promise<void> => {
    const c = new HttpClient('subscribe');
    const source = await c.subscribe<IApplicationsCount[]>({ query: 'applications-counts-get' });
    source.onmessage = function (e) {
      commit('setApplicationsCounts', JSON.parse(e.data));
    };
  },
};

export default actions;
