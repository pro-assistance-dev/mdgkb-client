import { ActionTree } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import DonorRuleUser from '@/classes/DonorRuleUser';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import getBaseActions from '@/services/store/baseModule/baseActions';
import { State } from './index';

const httpClient = new HttpClient('donor-rules');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DonorRule, State>(httpClient),
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<DonorRule[]>());
  },
  addToUser: async ({ commit }, item: DonorRuleUser): Promise<void> => {
    await httpClient.post<DonorRuleUser, DonorRuleUser>({
      query: 'add-to-user',
      payload: item,
    });
  },
  deleteFromUser: async ({ commit }, donorRuleId: string): Promise<void> => {
    await httpClient.delete({
      query: `delete-from-user/${donorRuleId}`,
    });
  },
};

export default actions;
