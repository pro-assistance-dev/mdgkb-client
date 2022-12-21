import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISupportMessage from '@/interfaces/ISupportMessage';
import ISupportMessagesWithCount from '@/interfaces/ISupportMessagesWithCount';
import INews from '@/interfaces/news/INews';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('support-messages');
// eslint-disable-next-line prefer-const

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<ISupportMessagesWithCount>({ query: filterQuery.toUrl() });
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', items);
      filterQuery.setAllLoaded(items ? items.supportMessages.length : 0);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: ISupportMessage): Promise<void> => {
    await httpClient.post<ISupportMessage, ISupportMessage>({
      payload: item,
      isFormData: true,
    });
    commit('set');
  },
  update: async ({ commit }, item: ISupportMessage): Promise<void> => {
    await httpClient.put<ISupportMessage, ISupportMessage>({
      query: `${item.id}`,
      payload: item,
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  changeNewStatus: async (_, item: ISupportMessage): Promise<void> => {
    await httpClient.put<ISupportMessage, ISupportMessage>({
      query: `new/${item.id}?isNew=${item.isNew}`,
    });
  },
};

export default actions;
