import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import IUser from '@/interfaces/users/IUser';

const httpClient = new HttpClient('users');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IUser[]>());
  },
  get: async ({ commit }, id: number) => {
    commit('set', await httpClient.get<IUser>({ query: `${id}` }));
  },
  findEmail: async ({ commit }, email): Promise<void> => {
    commit('emailExist', await httpClient.get<IUser[]>({ query: `get-by-email/${email}` }));
  },
};

export default actions;
