import { ActionTree } from 'vuex';

import IApplicationsCount from '@/interfaces/IApplicationsCount';
import HttpClient from '@/services/HttpClient';
import WebSocketClient from '@/services/WebSocketClient';
import RootState from '@/store/types';

import { State } from './state';

let source: EventSource | undefined = undefined;

const actions: ActionTree<State, RootState> = {
  subscribeApplicationsCountsGet: async ({ commit }): Promise<void> => {
    const c = new HttpClient('subscribe');
    source = await c.subscribe<IApplicationsCount[]>({ query: 'applications-counts-get' });
    source.onmessage = function (e) {
      commit('setApplicationsCounts', JSON.parse(e.data));
    };
  },
  unsubscribeApplicationsCountsGet: async ({ commit }): Promise<void> => {
    source?.close();
  },
  getApplicationsCounts: async ({ commit }): Promise<void> => {
    commit('setApplicationsCounts', await new HttpClient('meta').get<number>({ query: `get-applications-counts` }));
  },
  updateApplicationsCounts: async ({ commit }): Promise<void> => {
    new WebSocketClient(new HttpClient('meta').endpoint, 'app-counts-regular-update', 'setApplicationsCounts').setOnMessage(commit);
  },
};

export default actions;
