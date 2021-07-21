import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';
import State from './state';
import IUser from '@/interfaces/users/IUser';

const httpClient = new HttpClient();

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, { user: IUser; token: string }>({ query: 'users/login', payload: user });
    localStorage.setItem('token', token);
    commit('setToken', token);
    commit('setUser', newUser);
  },
  register: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, { user: IUser; token: string }>({ query: 'users/', payload: user });
    localStorage.setItem('token', token);
    commit('setToken', token);
    commit('setUser', newUser);
  },
};

export default actions;
