import { ActionTree } from 'vuex';

import Human from '@/classes/Human';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('candidate-applications');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<ICandidateApplication[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
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
    const res = await httpClient.get<ICandidateApplication[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<ICandidateApplication, ICandidateApplication>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    TokenService.updateHuman(new Human(state.item.formValue.user.human));
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<ICandidateApplication, ICandidateApplication>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    commit('set', res);
  },
  emailExists: async ({ state, commit }, examId): Promise<void> => {
    if (state.item.formValue.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<boolean>({ query: `email-exists/${state.item.formValue.user.email}/${examId}` });
    commit('setEmailExists', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<ICandidateApplication>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
