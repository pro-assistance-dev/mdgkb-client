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
    const res = await httpClient.get<IAdmissionCommitteeDocumentType[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IAdmissionCommitteeDocumentType[], IAdmissionCommitteeDocumentType[]>({
      payload: state.items,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  update: async (
    { state, commit },
    {
      admissionCommitteeDocumentTypes: admissionCommitteeDocumentTypes,
      admissionCommitteeDocumentTypesForDelete: admissionCommitteeDocumentTypesForDelete,
    }
  ): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    admissionCommitteeDocumentTypes.forEach((docType: IAdmissionCommitteeDocumentType) => {
      fileInfos.push(...docType.getFileInfos());
    });
    const res = await httpClient.put<unknown, unknown>({
      payload: {
        admissionCommitteeDocumentTypes: admissionCommitteeDocumentTypes,
        admissionCommitteeDocumentTypesTypesForDelete: admissionCommitteeDocumentTypesForDelete,
      },
      isFormData: true,
      fileInfos: fileInfos,
    });
    commit('set', res);
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
