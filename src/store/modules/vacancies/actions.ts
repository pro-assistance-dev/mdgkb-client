import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IVacancy from '@/interfaces/IVacancy';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('vacancies');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    commit('setAll', await httpClient.get<IVacancy[]>({ query: filterQuery ? filterQuery.toUrl() : '' }));
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
    });
    commit('set');
  },
  createResponse: async (_, item: IVacancyResponse): Promise<void> => {
    await httpClient.post<IVacancyResponse, IVacancyResponse>({
      query: 'response',
      payload: item,
      fileInfos: item.getFileInfos(),
      isFormData: true,
    });
  },
  update: async ({ commit }, vacancy: IVacancy): Promise<void> => {
    await httpClient.put<IVacancy, IVacancy>({
      query: `${vacancy.id}`,
      payload: vacancy,
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
