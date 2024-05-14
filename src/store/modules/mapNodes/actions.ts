import { ActionTree } from 'vuex';

import MapNodeRequestObject from '@/classes/MapNodeRequestObject';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('map-nodes');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  upload: async ({ commit }, nodes: MapNodeRequestObject): Promise<void> => {
    const route = await httpClient.post<MapNodeRequestObject, MapNodeRequestObject>({ query: `upload`, isFormData: true, payload: nodes });
    commit('set', route);
  },
};

export default actions;
