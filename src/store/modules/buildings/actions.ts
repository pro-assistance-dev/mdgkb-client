import { ActionTree } from 'vuex';

import Building from '@/classes/Building';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('buildings');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Building, State>(httpClient),
  getByFloorId: async ({ commit }, id: number) => {
    commit('set', await httpClient.get<Building>({ query: `floor/${id}` }));
  },
};

export default actions;
