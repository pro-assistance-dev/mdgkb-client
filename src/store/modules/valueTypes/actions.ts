import { ActionTree } from 'vuex';

import IValueType from '@/interfaces/IValueType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('value-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IValueType[]>());
  },
};

export default actions;
