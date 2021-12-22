import { ActionTree } from 'vuex';

import IPartner from '@/interfaces/partners/IPartner';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('partners');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IPartner[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPartner[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async (_, item: IPartner): Promise<void> => {
    const fileInfos = [];
    if (item.image) {
      fileInfos.push(item.image);
    }
    await httpClient.post<IPartner, IPartner>({ payload: item, fileInfos, isFormData: true });
  },
  update: async (_, item: IPartner): Promise<void> => {
    const fileInfos = [];
    if (item.image) {
      fileInfos.push(item.image);
    }
    await httpClient.put<IPartner, IPartner>({ query: `${item.id}`, payload: item, fileInfos, isFormData: true });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
