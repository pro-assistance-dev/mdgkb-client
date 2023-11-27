import { ActionTree } from 'vuex';

import User from '@/classes/User';
import IFavourite from '@/interfaces/IFavourite';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import FavouriteService from '@/services/Favourite';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('users');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<User[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: number) => {
    if (id) {
      commit('set', await httpClient.get<User>({ query: `${id}` }));
    }
  },
  findEmail: async ({ commit }, email): Promise<void> => {
    const res = await httpClient.get<User[]>({ query: `get-by-email/${email}` });
    commit('emailExist', res);
  },
  create: async ({ commit }, item: User) => {
    commit('set', await httpClient.post<User, User>({ fileInfos: item.getFileInfos(), payload: item, isFormData: true }));
  },
  update: async ({ commit }, item: User) => {
    commit(
      'set',
      await httpClient.put<User, User>({ query: `${item.id}`, fileInfos: item.getFileInfos(), payload: item, isFormData: true })
    );
  },
  addToUser: async ({ commit }, item: IFavourite) => {
    await httpClient.post<IFavourite, IFavourite>({ query: `add-to-user/${item.domain}`, payload: { id: item.id } });
    if (item.domain) {
      FavouriteService.addToFavourite(item.domain, item.id);
    }
  },
  removeFromUser: async ({ commit }, item: IFavourite) => {
    if (item.domain) {
      FavouriteService.removeFromFavourite(item.domain, item.id);
    }
    await httpClient.delete<IFavourite, IFavourite>({ query: `remove-from-user/${item.domain}/${item.id}` });
  },
};

export default actions;
