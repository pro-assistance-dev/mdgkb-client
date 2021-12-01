import { ActionTree } from 'vuex';

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
};

export default actions;
