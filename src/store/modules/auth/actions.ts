import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';
import State from './state';
import IUser from '@/interfaces/users/IUser';
import IToken from '@/interfaces/users/IToken';

const httpClient = new HttpClient('auth');

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, { user: IUser; token: IToken }>({ query: 'login', payload: user });
    localStorage.setItem('token', token.accessToken);
    if (newUser.id) localStorage.setItem('userId', newUser.id);
    commit('setToken', token);
    commit('setUser', newUser);
    commit('setIsAuth', true);
  },
  register: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, { user: IUser; token: IToken }>({ query: 'register', payload: user });
    localStorage.setItem('token', token.accessToken);
    if (newUser.id) localStorage.setItem('userId', newUser.id);
    commit('setToken', token.accessToken);
    commit('setUser', newUser);
  },
  logout: async ({ commit }): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    commit('setIsAuth', false);
  },
};

export default actions;
