import { ActionTree } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('dpo-applications');

let source: EventSource | undefined = undefined;

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  subscribeCreate: async ({ commit }, isNmo: boolean): Promise<void> => {
    const c = new HttpClient('subscribe');
    source = await c.subscribe<DpoApplication>({ query: 'dpo-application-create' });
    source.onmessage = function (e) {
      const application = JSON.parse(e.data) as DpoApplication;
      if (application.nmoCourse.isNmo === isNmo) {
        commit('unshiftToAll', application);
      }
    };
  },
  unsubscribeCreate: async (): Promise<void> => {
    source?.close();
  },
};

export default actions;
