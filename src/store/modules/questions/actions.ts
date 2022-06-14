import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IQuestion from '@/interfaces/IQuestion';
import IQuestionsWithCount from '@/interfaces/IQuestionsWithCount';
import INews from '@/interfaces/news/INews';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('questions');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IQuestionsWithCount>({ query: filterQuery.toUrl() });
    if (filterQuery && filterQuery.pagination.append) {
      commit('appendToAll', items);
      filterQuery.setAllLoaded(items ? items.questions.length : 0);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<INews>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit }, item: IQuestion): Promise<void> => {
    await httpClient.post<IQuestion, IQuestion>({
      payload: item,
    });
    commit('set');
  },
  update: async ({ commit }, item: IQuestion): Promise<void> => {
    await httpClient.put<IQuestion, IQuestion>({
      query: `${item.id}`,
      payload: item,
    });
    commit('set');
  },
  readAnswers: async ({ commit }, userId: string): Promise<void> => {
    await httpClient.put<IQuestion, IQuestion>({
      query: `read-answers/${userId}`,
    });
    commit('set');
  },
  publish: async ({ commit }, id: string): Promise<void> => {
    await httpClient.put<IQuestion, IQuestion>({
      query: `publish/${id}`,
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  changeNewStatus: async (_, question: IQuestion): Promise<void> => {
    await httpClient.put<IQuestion, IQuestion>({
      query: `new/${question.id}?isNew=${question.isNew}`,
    });
  },
};

export default actions;
