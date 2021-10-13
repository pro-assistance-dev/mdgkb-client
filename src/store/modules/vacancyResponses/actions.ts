import { ActionTree } from 'vuex';

import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('vacancy-responses');

const actions: ActionTree<State, RootState> = {
  create: async (_, vacancyResponse: IVacancyResponse): Promise<void> => {
    await httpClient.post<IVacancyResponse, IVacancyResponse>({
      payload: vacancyResponse,
    });
  },
  update: async ({ commit }, vacancyResponse: IVacancyResponse): Promise<void> => {
    await httpClient.put<IVacancyResponse, IVacancyResponse>({
      query: `${vacancyResponse.id}`,
      payload: vacancyResponse,
    });
    commit('set');
  },
};

export default actions;
