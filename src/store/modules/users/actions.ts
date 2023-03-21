import { ActionTree } from 'vuex';

import IFavourite from '@/interfaces/IFavourite';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import FavouriteService from '@/services/Favourite';
import HttpClient from '@/services/HttpClient';
import IUser from '@/services/interfaces/IUser';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('users');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<IUser[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: number) => {
    commit('set', await httpClient.get<IUser>({ query: `${id}` }));
  },
  findEmail: async ({ commit }, email): Promise<void> => {
    const res = await httpClient.get<IUser[]>({ query: `get-by-email/${email}` });
    commit('emailExist', res);
  },
  create: async ({ commit }, item: IUser) => {
    commit('set', await httpClient.post<IUser, IUser>({ fileInfos: item.getFileInfos(), payload: item, isFormData: true }));
  },
  update: async ({ commit }, item: IUser) => {
    commit(
      'set',
      await httpClient.put<IUser, IUser>({ query: `${item.id}`, fileInfos: item.getFileInfos(), payload: item, isFormData: true })
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
