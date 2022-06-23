import { ActionTree } from 'vuex';

import Human from '@/classes/Human';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyApplicationsWithCount from '@/interfaces/IResidencyApplicationsWithCount';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('residency-applications');
let source: EventSource | undefined = undefined;

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const item = await httpClient.get<IResidencyApplicationsWithCount>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.setAllLoaded(item ? item.residencyApplications.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', item);
      return;
    }
    commit('setAllWithCount', item);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IResidencyApplication[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IResidencyApplication, IResidencyApplication>({
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
    const res = await httpClient.put<IResidencyApplication, IResidencyApplication>({
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
    const res = await httpClient.get<IResidencyApplication>({ query: `slug/${slug}` });
    commit('set', res);
  },
  updateMany: async ({ state }): Promise<void> => {
    await httpClient.put<IResidencyApplication[], IResidencyApplication[]>({ query: 'many', payload: state.items });
  },
  subscribeCreate: async ({ commit }): Promise<void> => {
    const c = new HttpClient('subscribe');
    source = await c.subscribe<IDpoApplication>({ query: 'residency-application-create' });
    source.onmessage = function (e) {
      commit('appendToAll', [e.data]);
    };
  },
  unsubscribeCreate: async ({ commit }): Promise<void> => {
    source?.close();
  },
  filledApplicationDownload: async (_, item: IResidencyApplication): Promise<void> => {
    await httpClient.post<IResidencyApplication, IResidencyApplication>({
      payload: item,
      query: `fill-application-template`,
      isBlob: true,
      downloadFileName: 'Заявление_ординатура 2022.docx',
    });
  },
};

export default actions;
