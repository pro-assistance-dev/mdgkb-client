import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import Human from '@/classes/Human';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import IPostgraduateApplicationsWithCount from '@/interfaces/IPostgraduateApplicationsWithCount';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('postgraduate-applications');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const item = await httpClient.get<IPostgraduateApplicationsWithCount>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(item ? item.postgraduateApplications.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', item);
      return;
    }
    commit('setAllWithCount', item);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPostgraduateApplication[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IPostgraduateApplication, IPostgraduateApplication>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    TokenService.updateHuman(new Human(state.item.formValue.user.human));
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IPostgraduateApplication, IPostgraduateApplication>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    commit('set', res);
  },
  emailExists: async ({ state, commit }, courseId): Promise<void> => {
    if (state.item.formValue.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<boolean>({ query: `email-exists/${state.item.formValue.user.email}/${courseId}` });
    commit('setEmailExists', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IPostgraduateApplication>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
