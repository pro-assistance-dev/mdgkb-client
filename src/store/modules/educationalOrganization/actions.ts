import { ActionTree } from 'vuex';

import IEducationalOrganization from '@/interfaces/IEducationalOrganization';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('educational-organization');

const actions: ActionTree<State, RootState> = {
  get: async ({ commit }) => {
    commit('set', await httpClient.get<IEducationalOrganization>());
  },
  update: async ({ commit }, item: IEducationalOrganization): Promise<void> => {
    commit(
      'set',
      await httpClient.put<IEducationalOrganization, IEducationalOrganization>({
        payload: item,
        fileInfos: item.getFileInfos(),
        isFormData: true,
      })
    );
  },
};

export default actions;
