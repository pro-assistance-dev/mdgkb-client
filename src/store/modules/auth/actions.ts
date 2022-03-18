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
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
    commit('setFavourite', newUser);
  },
  register: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, tokens } = await httpClient.post<IUser, { user: IUser; tokens: ITokens }>({ query: 'register', payload: user });
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
  },
  restorePassword: async ({ commit }, user: IUser): Promise<void> => {
    await httpClient.post<IUser, IUser>({ query: 'restore-password', payload: user });
  },
  refreshPassword: async ({ commit }, user: IUser): Promise<void> => {
    await httpClient.put<IUser, IUser>({ query: 'refresh-password', payload: user });
  },
  logout: async ({ commit, state }): Promise<void> => {
    commit('setIsAuth', false);
    commit('clearUser');
    commit('clearTokens');
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
  checkUuid: async ({ commit }, checkObj: { userId: string; uniqueId: string }): Promise<void> => {
    await httpClient.get<IUser>({ query: `check-uuid/${checkObj.userId}/${checkObj.uniqueId}` });
  },
};

export default actions;
