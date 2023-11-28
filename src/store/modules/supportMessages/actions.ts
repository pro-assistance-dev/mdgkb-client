import { ActionTree } from 'vuex';

import News from '@/classes/News';
import SupportMessage from '@/classes/SupportMessage';
import ISupportMessagesWithCount from '@/interfaces/ISupportMessagesWithCount';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('support-messages');
// eslint-disable-next-line prefer-const

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery: FilterQuery): Promise<void> => {
    const items = await httpClient.get<ISupportMessagesWithCount>({ query: filterQuery.toUrl() });
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', items);
      filterQuery.pagination.setAllLoaded(items ? items.supportMessages.length : 0);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<News>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: SupportMessage): Promise<void> => {
    await httpClient.post<SupportMessage, SupportMessage>({
      payload: item,
      isFormData: true,
    });
    commit('set');
  },
  update: async ({ commit }, item: SupportMessage): Promise<void> => {
    await httpClient.put<SupportMessage, SupportMessage>({
      query: `${item.id}`,
      payload: item,
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  changeNewStatus: async (_, item: SupportMessage): Promise<void> => {
    await httpClient.put<SupportMessage, SupportMessage>({
      query: `new/${item.id}?isNew=${item.isNew}`,
    });
  },
};

export default actions;
