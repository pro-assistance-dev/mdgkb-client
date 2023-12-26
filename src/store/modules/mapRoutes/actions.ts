import { ActionTree } from 'vuex';

import MapRoute from '@/classes/MapRoute';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('doctors');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  getRoute: async ({ commit }, params: { startNodeId: string; endNodeId: string }): Promise<void> => {
    const route = await httpClient.get<MapRoute>({ query: `${params.startNodeId}/${params.endNodeId}` });
    commit('set', route);
  },
};

export default actions;
