import { ActionTree } from 'vuex';

import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('admission-committee-document-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IAdmissionCommitteeDocumentType[]>();
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
    const res = await httpClient.get<IAdmissionCommitteeDocumentType>({ query: `${id}` });
    commit('set', res);
  },
  create: async (_, item: IAdmissionCommitteeDocumentType): Promise<void> => {
    await httpClient.post<IAdmissionCommitteeDocumentType, IAdmissionCommitteeDocumentType>({
      payload: item,
      isFormData: true,
      fileInfos: item.getFileInfos(),
    });
  },
  updateAll: async ({ state, commit }): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    state.items.forEach((docType: IAdmissionCommitteeDocumentType) => {
      fileInfos.push(...docType.getFileInfos());
    });
    const res = await httpClient.put<unknown, any>({
      query: 'many',
      payload: {
        admissionCommitteeDocumentTypes: state.items,
        admissionCommitteeDocumentTypesForDelete: state.itemsForDelete,
      },
      isFormData: true,
      fileInfos: fileInfos,
    });
    commit('setAll', res.admissionCommitteeDocumentTypes);
  },
  updateOrder: async ({ state }): Promise<void> => {
    await httpClient.put<IAdmissionCommitteeDocumentType[], IAdmissionCommitteeDocumentType[]>({
      query: 'order',
      payload: state.items,
      isFormData: true,
    });
  },
  update: async ({ commit }, item: IAdmissionCommitteeDocumentType): Promise<void> => {
    await httpClient.put<IAdmissionCommitteeDocumentType, IAdmissionCommitteeDocumentType>({
      query: `${item.id}`,
      payload: item,
      isFormData: true,
      fileInfos: item.getFileInfos(),
    });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<IAdmissionCommitteeDocumentType>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
