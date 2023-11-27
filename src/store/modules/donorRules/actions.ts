import { ActionTree } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import DonorRulesWithDeleted from '@/classes/DonorRulesWithDeleted';
import DonorRuleUser from '@/classes/DonorRuleUser';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('donor-rules');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<DonorRule[]>());
  },
  updateMany: async ({ commit, state }): Promise<void> => {
    commit(
      'setAll',
      await httpClient.put<DonorRulesWithDeleted, DonorRulesWithDeleted>({
        payload: state.items,
        fileInfos: state.items.getFileInfos(),
        isFormData: true,
      })
    );
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
