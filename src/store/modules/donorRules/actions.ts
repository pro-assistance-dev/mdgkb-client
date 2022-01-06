import { ActionTree } from 'vuex';

import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRulesWithDeleted from '@/interfaces/IDonorRulesWithDeleted';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('donor-rules');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDonorRule[]>());
  },
  updateMany: async ({ commit, state }): Promise<void> => {
    commit(
      'setAll',
      await httpClient.put<IDonorRulesWithDeleted, IDonorRulesWithDeleted>({
        payload: state.items,
        fileInfos: state.items.getFileInfos(),
        isFormData: true,
      })
    );
  },
  addToUser: async ({ commit }, item: IDonorRuleUser): Promise<void> => {
    await httpClient.post<IDonorRuleUser, IDonorRuleUser>({
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
