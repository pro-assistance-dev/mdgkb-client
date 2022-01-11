import { ActionTree } from 'vuex';

import ITokens from '@/interfaces/ITokens';
import IUser from '@/interfaces/IUser';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('auth');

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, tokens } = await httpClient.post<IUser, { user: IUser; tokens: ITokens }>({ query: 'login', payload: user });
    if (newUser) {
      commit('setUser', newUser);
    }
    commit('setTokens', tokens);
    commit('setIsAuth', true);
  },
  register: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, tokens } = await httpClient.post<IUser, { user: IUser; tokens: ITokens }>({ query: 'register', payload: user });
    TokenService.setTokens(tokens);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
    commit('setUser', newUser);
    commit('setIsAuth', true);
  },
  logout: async ({ commit }): Promise<void> => {
    TokenService.clearTokens();
    commit('setIsAuth', false);
  },
  refreshToken: async ({ commit }): Promise<void> => {
    commit(
      'setTokens',
      await httpClient.post<any, { user: IUser; token: ITokens }>({
        query: 'refresh-token',
        payload: { refreshToken: TokenService.getRefreshToken() },
      })
    );
  },
};

export default actions;
