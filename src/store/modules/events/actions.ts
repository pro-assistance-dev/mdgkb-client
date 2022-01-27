import { ActionTree } from 'vuex';

import IEvent from '@/interfaces/news/IEvent';
import IEventApplication from '@/interfaces/news/IEventApplication';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('events');

const actions: ActionTree<State, RootState> = {
  sendEventApplications: async (_, eventApplication: IEventApplication): Promise<void> => {
    await httpClient.post<IEventApplication, IEventApplication>({ query: `application`, payload: eventApplication });
  },
  eventApplicationsPdf: async (_, id: string): Promise<void> => {
    await httpClient.get<IVacancyResponse>({
      query: `${id}/applications/pdf/`,
      isBlob: true,
      downloadFileName: 'Список заявок',
    });
  },
  getAllMain: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IEvent[]>({ query: 'main' }));
  },
};

export default actions;
