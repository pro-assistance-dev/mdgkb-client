import { ActionTree } from 'vuex';

import IFaq from '@/interfaces/IFaq';
import IFaqWithDeleted from '@/interfaces/IFaqWithDeleted';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('faqs');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IFaq[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IFaq[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: IFaq): Promise<void> => {
    await httpClient.post<IFaq, IFaq>({
      payload: item,
    });
    commit('set');
  },
  updateAll: async ({ commit }, items: IFaqWithDeleted): Promise<void> => {
    const faqWithDelete = await httpClient.put<IFaqWithDeleted, IFaqWithDeleted>({ payload: items });
    commit('setAll', faqWithDelete.faqs);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
