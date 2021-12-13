import { ActionTree } from 'vuex';

import IToken from '@/interfaces/IToken';
import IUser from '@/interfaces/IUser';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('auth');

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, { user: IUser; token: IToken }>({ query: 'login', payload: user });
    if (newUser) {
      commit('setUser', newUser);
    }
    commit('setToken', token.accessToken);
    commit('setIsAuth', true);
  },
  register: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, { user: IUser; token: IToken }>({ query: 'register', payload: user });
    localStorage.setItem('token', token.accessToken);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
    commit('setToken', token.accessToken);
    commit('setUser', newUser);
    commit('setIsAuth', true);
  },
  logout: async ({ commit }): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    commit('setIsAuth', false);
  },
};

export default actions;
