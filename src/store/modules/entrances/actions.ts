import { ActionTree } from 'vuex';

import Entrance from '@/classes/Entrance';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('entrances');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<Entrance[]>());
  },
};

export default actions;
