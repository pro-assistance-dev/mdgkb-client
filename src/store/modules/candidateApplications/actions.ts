import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('candidate-applications');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  emailExists: async ({ state, commit }, examId): Promise<void> => {
    if (state.item.formValue.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<boolean>({ query: `email-exists/${state.item.formValue.user.email}/${examId}` });
    commit('setEmailExists', res);
  },
};

export default actions;
