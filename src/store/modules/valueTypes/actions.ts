import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import ValueType from '@/services/classes/ValueType';

const httpClient = new HttpClient('value-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ValueType[]>());
  },
};

export default actions;
