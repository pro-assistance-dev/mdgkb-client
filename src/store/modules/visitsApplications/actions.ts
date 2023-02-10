import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IVisitsApplication from '@/interfaces/IVisitsApplication';
import IVisitsApplicationsWithCount from '@/interfaces/IVisitsApplicationsWithCount';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('visits-applications');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const item = await httpClient.get<IVisitsApplicationsWithCount>({ query: filterQuery ? filterQuery?.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(item ? item.visitsApplications.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', item);
      return;
    }
    commit('setAllWithCount', item);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IVisitsApplication[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IVisitsApplication, IVisitsApplication>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  update: async ({ state }): Promise<void> => {
    await httpClient.put<IVisitsApplication, IVisitsApplication>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
