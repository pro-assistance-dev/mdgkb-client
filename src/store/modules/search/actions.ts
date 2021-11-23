import { ActionTree } from 'vuex';

import ISearchModel from '@/interfaces/ISearchModel';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('search');

const actions: ActionTree<State, RootState> = {
  search: async ({ commit }, searchModel: ISearchModel): Promise<void> => {
    searchModel.searchGroups = [];
    commit('setSearchModel', await httpClient.get<ISearchModel>({ query: `?searchModel=${searchModel.toUrl()}` }));
  },
  searchGroups: async ({ commit }): Promise<void> => {
    commit('setSearchGroups', await httpClient.get<ISearchModel>({ query: `search-groups` }));
  },
};

export default actions;
