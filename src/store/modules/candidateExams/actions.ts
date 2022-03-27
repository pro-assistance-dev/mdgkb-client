import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ICandidateExam from '@/interfaces/ICandidateExam';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('candidate-exams');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<ICandidateExam[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<ICandidateExam[]>();
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<ICandidateExam, ICandidateExam>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.formPattern.getFileInfos(),
    });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<ICandidateExam, ICandidateExam>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.formPattern.getFileInfos(),
    });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<ICandidateExam>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
