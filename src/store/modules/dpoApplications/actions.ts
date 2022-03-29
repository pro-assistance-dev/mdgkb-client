import { ActionTree } from 'vuex';

import Human from '@/classes/Human';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IDpoApplication from '@/interfaces/IDpoApplication';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('dpo-applications');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IDpoApplication[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
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
    const res = await httpClient.get<IDpoApplication[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IDpoApplication, IDpoApplication>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    TokenService.updateHuman(new Human(state.item.user.human));
  },
  emailExists: async ({ state, commit }, courseId): Promise<void> => {
    if (state.item.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<IDpoApplication[]>({ query: `email-exists/${state.item.user.email}/${courseId}` });
    commit('setEmailExists', res);
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IDpoApplication, IDpoApplication>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
    });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IDpoApplication>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
