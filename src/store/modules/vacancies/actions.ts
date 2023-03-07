import { ActionTree } from 'vuex';

import FilterQuery from '@/services/classes/filters/FilterQuery';
import IVacanciesWithCount from '@/interfaces/IVacanciesWithCount ';
import IVacancy from '@/interfaces/IVacancy';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('vacancies');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const item = await httpClient.get<IVacanciesWithCount>({ query: filterQuery ? filterQuery?.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(item ? item.vacancies.length : 0);
    }
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', item);
      return;
    }
    commit('setAllWithCount', item);
  },
  getAllWithResponses: async ({ commit }): Promise<void> => {
    commit(
      'setAll',
      await httpClient.get<IVacancy[]>({
        query: '?withResponses=true',
      })
    );
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IVacancy>({ query: `${id}` });
    commit('set', res);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IVacancy>({ query: `slug/${slug}` });
    commit('set', res);
  },
  create: async ({ commit }, vacancy: IVacancy): Promise<void> => {
    await httpClient.post<IVacancy, IVacancy>({
      payload: vacancy,
      isFormData: true,
      fileInfos: vacancy.formPattern?.getFileInfos(),
    });
    commit('set');
  },
  update: async ({ commit }, vacancy: IVacancy): Promise<void> => {
    await httpClient.put<IVacancy, IVacancy>({
      query: `${vacancy.id}`,
      payload: vacancy,
      isFormData: true,
      fileInfos: vacancy.formPattern?.getFileInfos(),
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  updateMany: async ({ state }): Promise<void> => {
    await httpClient.put<IVacancy[], IVacancy[]>({ query: `/many`, payload: state.items, isFormData: true });
  },
};

export default actions;
