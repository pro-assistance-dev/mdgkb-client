import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';

const httpClient = new HttpClient('side-organizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ISideOrganization[]>());
  },
};

export default actions;
