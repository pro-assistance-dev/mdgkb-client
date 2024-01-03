import { ActionTree } from 'vuex';

import MapNode from '@/classes/MapNode';
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
  create: async (_, nodes: MapNode[]): Promise<void> => {
    await httpClient.post<MapNode[], MapNode[]>({ payload: nodes, isFormData: true });
  },
};

export default actions;
