import { ActionTree } from 'vuex';

import ValueType from '@/services/classes/ValueType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';

import State from './index';

const httpClient = new HttpClient('value-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ValueType[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    commit('set', await httpClient.get<ValueType>({ query: id }));
  },
};

export default actions;
