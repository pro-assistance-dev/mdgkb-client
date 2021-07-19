import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import IHealthOrganization from '@/interfaces/healthOrganization/IHealthOrganization';

const httpClient = new HttpClient('dictionary/side_organizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IHealthOrganization[]>());
  },
};

export default actions;
