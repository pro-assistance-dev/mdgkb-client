import { ActionTree } from 'vuex';

import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('vacancy-responses');

const actions: ActionTree<State, RootState> = {
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IVacancyResponse>({ query: `${id}` });
    commit('set', res);
  },
  create: async (_, item: IVacancyResponse): Promise<void> => {
    await httpClient.post<IVacancyResponse, IVacancyResponse>({
      payload: item,
      fileInfos: item.getFileInfos(),
      isFormData: true,
    });
  },
  update: async (_, item: IVacancyResponse): Promise<void> => {
    await httpClient.put<IVacancyResponse, IVacancyResponse>({
      query: `${item.id}`,
      fileInfos: item.getFileInfos(),
      payload: item,
      isFormData: true,
    });
  },
  pdf: async (_, id: string): Promise<void> => {
    await httpClient.get<IVacancyResponse>({
      query: `pdf/${id}`,
      isBlob: true,
    });
  },
  emailExists: async ({ state, commit }, vacancyId): Promise<void> => {
    if (state.item.formValue.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<boolean>({ query: `email-exists/${state.item.formValue.user.email}/${vacancyId}` });
    commit('setEmailExists', res);
  },
};

export default actions;
