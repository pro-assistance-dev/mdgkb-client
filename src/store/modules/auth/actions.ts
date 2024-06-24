import { ActionTree } from 'vuex';

import User from '@/classes/User';
import IPathPermission from '@/interfaces/IPathPermission';
import IPathPermissionsWithCount from '@/interfaces/IPathPermissionsWithCount';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import ITokens from '@/services/interfaces/ITokens';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('auth');

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, user: User): Promise<void> => {
    console.log('LOGIN', user);
    const res = await httpClient.post<User, { user: User; tokens: ITokens }>({ query: 'login', payload: user });
    if (!res) {
      return;
    }
    const { user: newUser, tokens } = res;
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
    commit('setFavourite', newUser);
  },
  loginAs: async ({ commit }, email: string): Promise<void> => {
    const res = await httpClient.post<{ email: string }, { user: User; tokens: ITokens }>({
      query: 'login-as',
      payload: { email: email },
    });
    if (!res) {
      return;
    }
    const { user: newUser, tokens } = res;
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
    commit('setFavourite', newUser);
  },
  register: async ({ commit }, user: User): Promise<void> => {
    const res = await httpClient.post<User, { user: User; tokens: ITokens }>({ query: 'register', payload: user });
    if (!res) {
      return;
    }
    const { user: newUser, tokens } = res;
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
  },
  restorePassword: async ({ commit }, user: User): Promise<void> => {
    //   const userId = Provider.route().params['userId'];
    await httpClient.post<User, User>({ query: 'restore-password', payload: user });
  },
  passwordChange: async ({ commit }, user: User): Promise<void> => {
    await httpClient.post<User, User>({ query: 'password-change', payload: user });
  },
  refreshPassword: async ({ commit }, user: User): Promise<void> => {
    await httpClient.put<User, User>({ query: 'refresh-password', payload: user });
  },
  logout: async ({ commit, state }): Promise<void> => {
    commit('setIsAuth', false);
    commit('clearUser');
    commit('clearTokens');
  },
  refreshToken: async ({ commit }): Promise<void> => {
    commit(
      'setTokens',
      await httpClient.post<any, { user: User; token: ITokens }>({
        query: 'refresh-token',
        payload: { refreshToken: TokenService.getRefreshToken() },
      })
    );
  },
  checkUuid: async ({ commit }, checkObj: { userId: string; uniqueId: string }): Promise<void> => {
    await httpClient.get<User>({ query: `check-uuid/${checkObj.userId}/${checkObj.uniqueId}` });
  },
  checkPathPermissions: async ({ commit }, path: string): Promise<void> => {
    await httpClient.post<string, string>({ query: `check-path-permissions`, payload: path });
  },
  savePathPermissions: async ({ commit }, paths: IPathPermission[]): Promise<void> => {
    await httpClient.put<IPathPermission[], IPathPermission[]>({ query: 'path-permissions', payload: paths });
  },
  getAllPathPermissions: async ({ commit }): Promise<void> => {
    commit('setPathPermissions', await httpClient.get<IPathPermission[]>({ query: 'path-permissions' }));
  },
  getAllPathPermissionsAdmin: async ({ commit }, filterQuery: FilterQuery): Promise<void> => {
    const query = `path-permissions/admin/${filterQuery.toUrl()}`;
    commit('setPathPermissionsAdmin', await httpClient.get<IPathPermissionsWithCount>({ query }));
  },
  getUserPathPermissions: async ({ state, commit }): Promise<void> => {
    commit('setUserPathPermissions', await httpClient.get<IPathPermission[]>({ query: `path-permissions/${state.user.roleId}` }));
  },
  setAuth: async ({ state, commit }): Promise<void> => {
    const user = TokenService.getUser();
    const token = TokenService.getAccessToken();
    if (user && token) {
      commit('setTokens', token);
      commit('setUser', user);
      commit('setIsAuth', true);
    }
  },
};

export default actions;
