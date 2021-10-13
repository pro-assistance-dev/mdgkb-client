import { ActionTree } from 'vuex';

import INews from '@/interfaces/news/INews';
import IVacancy from '@/interfaces/vacancies/IVacancy';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('vacancies');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IVacancy[]>());
  },
  getAllWithResponses: async ({ commit }): Promise<void> => {
    commit(
      'setAll',
      await httpClient.get<IVacancy[]>({
        query: '?withResponses=true',
      })
    );
  },
  get: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `${slug}` });
    commit('set', res);
  },
  create: async ({ commit }, vacancy: IVacancy): Promise<void> => {
    await httpClient.post<IVacancy, IVacancy>({
      payload: vacancy,
    });
    commit('set');
  },
  createResponse: async (_, vacancyResponse: IVacancyResponse): Promise<void> => {
    await httpClient.post<IVacancyResponse, IVacancyResponse>({
      query: 'response',
      payload: vacancyResponse,
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
