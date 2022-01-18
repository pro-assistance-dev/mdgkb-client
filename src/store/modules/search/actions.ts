import { ActionTree } from 'vuex';

import ISearchElement from '@/interfaces/ISearchElement';
import ISearchModel from '@/interfaces/ISearchModel';
import { SearchModes } from '@/interfaces/SearchModes';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('search');

const actions: ActionTree<State, RootState> = {
  search: async ({ commit }, searchModel: ISearchModel): Promise<void> => {
    if (searchModel.searchMode === SearchModes.SearchModeMain) {
      commit('setSearchModel', await httpClient.get<ISearchModel>({ query: `?searchModel=${searchModel.toUrl()}` }));
      return;
    }
    const item = await httpClient.get<ISearchModel>({ query: `?searchModel=${searchModel.toUrl()}` });
    if (item) {
      item.searchGroup.options.forEach((opt: ISearchElement) => {
        searchModel.searchObjects.push({ id: opt.value, value: opt.label });
      });
    }

    console.log(searchModel.searchObjects);
    // item.forEach((i: IDoctor) => {
    //   if (i.id) {
    //     search.searchObjects.push({ value: `${i.human.surname} ${i.human.name} ${i.human.patronymic}`, id: i.human.slug });
    //   }
    // });
  },
  searchGroups: async ({ commit }): Promise<void> => {
    commit('setSearchGroups', await httpClient.get<ISearchModel>({ query: `search-groups` }));
  },
};

export default actions;
