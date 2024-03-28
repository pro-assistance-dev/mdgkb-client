import { ActionTree } from 'vuex';

import MapNode from '@/classes/MapNode';
import MapRoute from '@/classes/MapRoute';
import IStartEndNode from '@/interfaces/IStartEndNode';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('map-routes');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  getRoute: async ({ commit }, nodes: IStartEndNode): Promise<void> => {
    const route = await httpClient.get<MapRoute>({ query: `${nodes.startNodeId}/${nodes.endNodeId}` });
    commit('set', route);
  },
  create: async (_, nodes: MapNode[]): Promise<void> => {
    await httpClient.post<MapNode[], MapNode[]>({ payload: nodes, isFormData: true });
  },
};

export default actions;
