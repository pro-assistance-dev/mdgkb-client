import { ActionTree } from 'vuex';

import IPartnerType from '@/interfaces/partners/IPartnerType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('partner-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IPartnerType[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPartnerType[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async (_, item: IPartnerType): Promise<void> => {
    await httpClient.post<IPartnerType, IPartnerType>({
      payload: item,
    });
  },
  update: async (_, item: IPartnerType): Promise<void> => {
    await httpClient.put<IPartnerType, IPartnerType>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
