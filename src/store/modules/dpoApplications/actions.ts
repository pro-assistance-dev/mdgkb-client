import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import Human from '@/classes/Human';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoApplicationsWithCount from '@/interfaces/IDpoApplicationsWithCount';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('dpo-applications');

let source: EventSource | undefined = undefined;

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const item = await httpClient.get<IDpoApplicationsWithCount>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(item ? item.dpoApplications.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', item);
      return;
    }
    commit('setAllWithCount', item);
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
    TokenService.updateHuman(new Human(state.item.formValue.user.human));
  },
  emailExists: async ({ state, commit }, courseId): Promise<void> => {
    if (state.item.formValue.user.email.length < 3) {
      return;
    }
    const res = await httpClient.get<boolean>({ query: `email-exists/${state.item.formValue.user.email}/${courseId}` });
    commit('setEmailExists', res);
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IDpoApplication, IDpoApplication>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
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
  subscribeCreate: async ({ commit }, isNmo: boolean): Promise<void> => {
    const c = new HttpClient('subscribe');
    source = await c.subscribe<IDpoApplication>({ query: 'dpo-application-create' });
    source.onmessage = function (e) {
      const application = JSON.parse(e.data) as IDpoApplication;
      if (application.dpoCourse.isNmo === isNmo) {
        commit('unshiftToAll', application);
      }
    };
  },
  unsubscribeCreate: async (): Promise<void> => {
    source?.close();
  },
};

export default actions;
