import { ActionTree } from 'vuex';

import VacancyResponse from '@/classes/VacancyResponse';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('vacancy-responses');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  pdf: async (_, id: string): Promise<void> => {
    await httpClient.get<VacancyResponse>({
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
