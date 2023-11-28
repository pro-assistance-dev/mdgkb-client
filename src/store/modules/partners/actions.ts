import { ActionTree } from 'vuex';

import Partner from '@/classes/Partner';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('partners');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<Partner[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<Partner[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async (_, item: Partner): Promise<void> => {
    const fileInfos = [];
    if (item.image) {
      fileInfos.push(item.image);
    }
    await httpClient.post<Partner, Partner>({ payload: item, fileInfos, isFormData: true });
  },
  update: async (_, item: Partner): Promise<void> => {
    const fileInfos = [];
    if (item.image) {
      fileInfos.push(item.image);
    }
    await httpClient.put<Partner, Partner>({ query: `${item.id}`, payload: item, fileInfos, isFormData: true });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
