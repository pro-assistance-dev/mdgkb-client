import { ActionTree } from 'vuex';

import Event from '@/classes/Event';
import EventApplication from '@/classes/EventApplication';
import VacancyResponse from '@/classes/VacancyResponse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('events');

const actions: ActionTree<State, RootState> = {
  sendEventApplications: async (_, eventApplication: EventApplication): Promise<void> => {
    await httpClient.post<EventApplication, EventApplication>({ query: `application`, payload: eventApplication });
  },
  eventApplicationsPdf: async (_, id: string): Promise<void> => {
    await httpClient.get<VacancyResponse>({
      query: `${id}/applications/pdf/`,
      isBlob: true,
      downloadFileName: 'Список заявок',
    });
  },
  getAllMain: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<Event[]>({ query: 'main' }));
  },
};

export default actions;
