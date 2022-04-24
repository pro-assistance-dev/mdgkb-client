import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IFavourite from '@/interfaces/IFavourite';
import IUser from '@/interfaces/IUser';
import FavouriteService from '@/services/Favourite';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('users');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
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
